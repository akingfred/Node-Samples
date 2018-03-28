const mysql = require('mysql');
const dbConfig = {
   host: 'localhost',
   user: 'root',
   password: '',
   port: 3306,
   database: 'example'
};

const conn = mysql.createConnection(dbConfig);

conn.connect( (err) => {
   if (err) {
      console.error('error connecting: ', err);
      return;
   }

   //console.log(conn);
   console.log('DB 연결 성공 ');
   // 연결 종료
   conn.end();
});