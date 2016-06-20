## typed-rows

`typed-rows` is a little command-line tool to generate type information for mysql tables in form of [Typescript Interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html).

### Motivation

Typescript language provides great safety checks and tooling for javascript. If you query the database the rows that you get using the default [node-mysql](https://github.com/mysqljs/mysql) query function are a collection of the `any` object type.
  
```
    connection.query('SELECT * FROM Users;', (err, rows) => {
        rows[0].id; // No type information
    });
```    

You can manually provide the type information for the type of result that you are expecting using an interface:
 
```
    interface IUsers {
        id : number;
        name : string;
    }
    connection.query('SELECT * FROM Users;', (err, rows : IUsers[]) => {
        rows[0].id; // Now you have type information!
    });
```    

That works but if you have a big database with a lot of tables and columns could be very tedious to write (and maintain) all these interfaces. So you can use `typed-rows` to automatically generate a `TyepedRows.ts` file with all the interfaces generated automatically from your database.    

```
    $ typed-rows --database=phpmyadmin --user=root > TypedRows.ts
    Password:
    $ cat TypedRows.ts
    export interface IPmaTracking { 
            db_name : string;
            table_name : string;
            version : number;
            date_created : Date;
            date_updated : Date;
            schema_snapshot : string;
            schema_sql? : string;
            data_sql? : string;
            tracking? : any;
            tracking_active : number;
    }
    
    export interface IPmaUserconfig { 
            username : string;
            timevalue : any;
            config_data : string;
    }
    
    export interface IPmaUsergroups { 
            usergroup : string;
            tab : string;
            allowed : 'Y' | 'N';
    }
    
    export interface IPmaUsers { 
            username : string;
            usergroup : string;
    }
    //...
```
    
Now you can import this file and use the interfaces to have typed rows.

```
    import {IPmaUsergroups} from "./TypedRows";
    connection.query('SELECT * FROM pma__usergroups;', (err, rows : IPmaUsergroups[]) => {
        rows[0].allowed = 'Y';
    });
```
  
### Helpers
  
If you are using `typed-rows` could be nice to have a [generic function](https://www.typescriptlang.org/docs/handbook/generics.html) like:
   
  ```
    export interface FunDb<T> {
      (err: mysql.IError, rows: T[]): void;
    }

    function typedRows<T>(q, replaces?, callback? : FunDb<T>) {
       return conn.query(q, replaces, (err, result : T[]) => {
         if (err) {
           console.log('Error Query', q,  err);
         }
         if (callback) {
           callback(err, result);
         }
       });
    }
  ```
   
   Then you can use `typedRows` function with a `TypedRows` interface:
    
```
    import {IPmaUsergroups} from "./TypedRows";
    typedRows<IPmaUsergroups>('SELECT * FROM pma__usergroups;', callback);    
```

### Features 

- Supported mysql fields: text, varchar, int, integer, smalint, tinyint, mediumint, decimal, numeric, double, bigint, float, decimal, enum, datetime.  
- If a mysql data type is not recognized the column would be `any`. 
- The generated interfaces are compatible with the automatic typecasts do it by [node-mysql](https://github.com/mysqljs/mysql). Eg. a mysql `datetime` type would be mapped to a `Date` class in the typed-rows generated interface.  
 

### Installation & usage

npm installation:

```
  $ npm install -g typed-rows
```

The installation should give you a global `typed-rows` command, which you can use directly to extract type information from a mysql database and write the interfaces to the standard output.

```
  $ typed-rows --help

  Usage: typed-rows [options]

  Options:

    -h, --help                 output usage information
    -V, --version              output the version number
    -u, --user [user]          Mysql user
    -p, --password [password]  Mysql password
    -d, --database <database>  Database name
    -h, --host [host]          Database host
```

### Tests
To run tests you must create an empty database and configure a `test/config.json` based on `test/config_template.json`.
```
{
  "dbTest": {
    "user": "root",
    "password": "",
    "database": "typed_rows_test",
    "host": "127.0.0.1"
  }
}
```
Then you simply run: 
```
npm test
```

### TODO

* More databases support (postgresql, sqlite).
* More datatypes support.
* More testing.
* Test windows & mac support.

