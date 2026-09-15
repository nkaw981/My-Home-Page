export class QueryFromD1 {
    /*
    * A collection of pre-written database methods.
    */
    static async selectAllFromTable(env) {
        /*
        * Uses D1Database.prepare(string), which prepares a statement D1PreparedStatement.
        * Needs to call D1PreparedStatement.run()/all()/first() to actually return results.
        */
        let { results } = await env.MY_DATABASE.prepare(`SELECT * FROM Pokemons`).all();
        return new Response(JSON.stringify(results));
    }
    static async insertToTable(env, row) {
        /*
        * Uses D1Database.prepare(string), which prepares a statement D1PreparedStatement.
        * D1PreparedStatement.bind(...) is used to fill placeholders with actual values (and
        * without accidentally allowing SQL Injection).
        */
        await (env.MY_DATABASE.prepare(`INSERT INTO Pokemons (PokedexID, PokemonName, BaseHP, BaseATK, BaseDEF, BaseSPA, BaseSPD, BaseSPE)\
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`)
            .bind(row.PokedexID, row.PokemonName, row.BaseHP, row.BaseATK, row.BaseDEF, row.BaseSPA, row.BaseSPD, row.BaseSPE))
            .run()
        return new Response(null, {status: 201})
    }
    static async deleteAllRows(env) {
        /*
        * Uses D1Database.exec(string), which executes queries directly and returns D1ExecResult.
        * D1ExecResult only has properties count (number of executed queries)
        * and duration (how long it took the query to execute.)
        */
        await env.MY_DATABASE.exec(`DELETE FROM Pokemons`);
        return new Response(null, {status: 204})
    }
}

