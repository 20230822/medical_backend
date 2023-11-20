const maria = require('../database/maria');


/**
 * connection pool로 쿼리 실행
 * @param {string} query - 쿼리문
 * @param {any} params - 쿼리의 ?에들어갈 값
 * @returns {any} - rows : 각행의 데이터 fields : 컬럼이름, 타입
 */
async function queryExe(query, params = []){
    let conn;
    try {
        conn = await maria.getConnection();
        return [rows, fields] = await conn.query(query, params);
    } catch (error) {
        throw error;
    } finally {
        if (conn) {
            conn.release();
        }
    }
}

module.exports = queryExe;