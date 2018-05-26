'use strict';

console.log('Loading function');

exports.handler = (event, context, callback) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));
    var mysql = require('mysql');

    var con = mysql.createConnection({
        host: "mysqldbinstance.cysrvxxuaaap.us-east-1.rds.amazonaws.com",
        user: "admin",
        password: "Passw0rd",
        port: 3306,
        database: 'masterdb'
    });

    con.connect();
    let result = null;
    const lineItemquery = 'select distinct lim.mapped_line_item, max(base_rate) as max_base_rate, min(base_rate) as min_base_rate , max(base_cost) as max_base_cost, min(base_cost) as min_base_cost, max(Benchmark_Rate) as max_bm_rate, min(Benchmark_Rate) as min_bm_rate, max(Benchmark_Cost) as max_bm_cost, min(Benchmark_Cost) as min_bm_cost from mastertable as mt  join line_item_mapping_tbl lim on lim.line_item = mt.line_item group by lim.mapped_line_item';
    
    // const costdeviationquesry = "select cost_head,base_cost as client_cost, benchmark_cost,  ((sum(Base_Cost) - sum(Benchmark_Cost))/sum(Base_Cost))*100 as deviation  from mastertable where Client_ID = '1' and Contract_ID = '1' group by cost_head";
    // const costdeviationquesry = "select cost_head,base_cost as client_cost, benchmark_cost,  ((sum(Base_Cost) - sum(Benchmark_Cost))/sum(Base_Cost))*100 as deviation  from mastertable where Client_ID = '1' and Contract_ID = '1' and project_title_id ='"+event.project_title+ "' and production_house_id ='"+event.cost_option+ "'and film_description_id ='"+event.filmdesc+ "' group by cost_head";
    const costdeviationquesry = "select cost_head, sum(base_cost) as client_cost, sum(Benchmark_Cost_Min) as benchmark_min, sum(Benchmark_Cost_Max) as benchmark_max,  (sum(base_cost) - sum(Benchmark_Cost_Max)) as efficiency_min,  (sum(base_cost) - sum(Benchmark_Cost_Min)) as efficiency_max,ROUND(((sum(base_cost) - sum(Benchmark_Cost_Max))/sum(base_cost) )*100,0 )as deviation_min, ROUND(((sum(base_cost) - sum(Benchmark_Cost_Min))/sum(base_cost) )*100 ,0)as deviation_max  from mastertable where Client_ID = '1' and Contract_ID = '1' and project_title_id ='"+event.project_title+ "' and production_house_id ='"+event.cost_option+ "'and film_description_id ='"+event.filmdesc+ "' group by cost_head";
    let query = lineItemquery;
    let type = event.type;
    if (event.type === 'cost_deviation') {
        query = costdeviationquesry;
    }else if(event.type === 'total_deviation'){
        //query = "select  ((sum(Base_Cost) - sum(Benchmark_Cost))/sum(Base_Cost))*100 as deviation  from mastertable where Client_ID = '1' and Contract_ID = '1' ";
        // query = "select  ROUND(((sum(Base_Cost) - sum(Benchmark_Cost_Min))/sum(Base_Cost))*100,0) as deviation,sum(base_cost) as client_cost, sum(Benchmark_Cost_Min) as benchmark_min, sum(Benchmark_Cost_Max) as benchmark_max,  (sum(base_cost) - sum(Benchmark_Cost_Max)) as efficiency_min,  (sum(base_cost) - sum(Benchmark_Cost_Min)) as efficiency_max  from mastertable where Client_ID = '1' and Contract_ID = '1' and project_title_id ='"+event.project_title+ "' and production_house_id ='"+event.cost_option+ "'and film_description_id ='"+event.filmdesc+ "'";
         query = " select  ROUND(((sum(Base_Cost) - sum(Benchmark_Cost_Min))/sum(Base_Cost))*100,0) as ae_deviation, ROUND(((sum(Base_Cost) - sum(Benchmark_Cost_Max))/sum(Base_Cost))*100,0) as pe_deviation, sum(base_cost) as client_cost, sum(Benchmark_Cost_Min) as ae_benchmark, sum(Benchmark_Cost_Max) as pe_benchmark, (sum(base_cost) - sum(Benchmark_Cost_Max)) as pe_efficiency, (sum(base_cost) - sum(Benchmark_Cost_Min)) as ae_efficiency from mastertable where Client_ID = '1' and Contract_ID = '1' and project_title_id ='"+event.project_title+ "' and production_house_id ='"+event.cost_option+ "'and film_description_id ='"+event.filmdesc+ "'";
    }else if(event.type === 'line_item_efficiency'){
        //query = "select Line_Item , Units, No_of_X as Nos, Base as Type, Base_Rate as Client_Rate, Base_Cost as Client_Cost, Benchmark_Rate, Benchmark_Cost,(base_cost - benchmark_cost) as Efficiency_Value, ( (base_cost - benchmark_cost) /base_cost)*100 as Efficiency_Per from mastertable where cost_head = '"+event.param1+"' and  Client_ID = '1' and Contract_ID ='1'";
        // query = "select line_item , units, no_of_x as nos, base as type, base_rate as client_rate, Base_Cost as client_cost, benchmark_rate_min, benchmark_rate_max, benchmark_cost_min, benchmark_cost_max, (base_cost - benchmark_cost_max) as efficiency_value_min, (base_cost - benchmark_cost_min) as efficiency_value_max, ROUND(((base_cost - benchmark_cost_max) /base_cost)*100,0) as efficiency_per_min , ROUND(((base_cost - benchmark_cost_min) /base_cost)*100,0) as efficiency_per_max, comments as observations from mastertable where cost_head = '"+event.param1+"' and  Client_ID = '1' and Contract_ID ='1' and project_title_id ='"+event.project_title+ "' and production_house_id ='"+event.cost_option+ "'and film_description_id ='"+event.filmdesc+ "'";
        query = "select cost_head,line_item , units, no_of_x as nos, base as type, base_rate as client_rate, Base_Cost as client_cost, benchmark_rate_min, benchmark_rate_max, benchmark_cost_min, benchmark_cost_max, (base_cost - benchmark_cost_max) as efficiency_value_min, (base_cost - benchmark_cost_min) as efficiency_value_max, ROUND(((base_cost - benchmark_cost_max) /base_cost)*100,0) as efficiency_per_min , ROUND(((base_cost - benchmark_cost_min) /base_cost)*100,0) as efficiency_per_max, comments as observations from mastertable where  Client_ID = '1' and Contract_ID ='1' and project_title_id ='"+event.project_title+ "' and production_house_id ='"+event.cost_option+ "'and film_description_id ='"+event.filmdesc+ "'";
    }else if(event.type === 'summary'){
        query = "select distinct producer, director, no_of_films,shoot_on,data_receipt_date,report_date, observation_ove from mastertable mt left join  observation_overall ob on mt.project_title_id = ob.project_title_id and mt.film_description_id = ob.film_description_id  where mt.Client_ID = 1 and mt.Contract_ID = 1 and mt.project_title_id ='"+event.project_title+ "' and mt.film_description_id ='"+event.filmdesc+ "'";
    }else if(event.type === 'observation_summary'){
         query = "select distinct mt.cost_head, ot.observation_cat as observation from observation_cat as ot right join mastertable mt on ot.cost_head_id = mt.cost_head_id   where ot.client_id = 1 and ot.contract_id = 1 and ot.project_title_id ='"+event.project_title+ "' and mt.production_house_id ='"+event.cost_option+ "'and ot.film_description_id ='"+event.filmdesc+ "'";
    }else if(event.type === 'first_bytes'){
        query = "select cost_head, base_cost, benchmark_cost_min, (base_cost - benchmark_cost_min) as efficiency_value, (((base_cost - benchmark_cost_min))/base_cost)*100 as efficiency_per from mastertable where client_id= '1' and contract_id='1' and project_title_id ='"+event.project_title+ "' and film_description_id ='"+event.filmdesc+ "' and production_house_id ='"+event.cost_option+ "' group by cost_head ";
    }else if(event.type === 'deepdive'){
        query = "select cost_head,line_item , units, no_of_x as nos, base as basis, base_rate as client_rate, Base_Cost as client_cost, benchmark_rate_min,  benchmark_cost_min, (base_cost - benchmark_cost_min) as efficiency_value, ROUND(((base_cost - benchmark_cost_min) /base_cost)*100,0) as efficiency_per, comments  from mastertable where  Client_ID = '1' and Contract_ID ='1'";

        query= "select m1.line_item ,m1.base_rate, m1.Mapped_Line_Item , `date` as d from mastertable m1";
    }
    con.query(query, function (error, results, fields) {
        if (error) {

        } else {
            result = results;
        }
        con.end();
        callback(error, {
            data: result,type:type
        });
    });


};