select distinct cost_head,base_cost as client_cost, benchmark_cost, (base_cost - benchmark_cost) as efficiency_value, (((base_cost - benchmark_cost))/base_cost)*100 as deviation from mastertable group by cost_head
select  cost_head,base_cost from mastertable group by category

select distinct client,  brand,  product, Agency, Category, sub_Category , Shoot_Location, date, format, length , Language_Master, Executive_Director,Director,Director_Grade,Executive_Director,Production_House,PH_Grade,DOP_Grade,No_of_Films,Shooting_Days,Mediums,Buyout from mastertable



select distinct cost_head, sub_cost_head, lim.mapped_line_item, max(base_rate) as max_base_rate, min(base_rate) as min_base_rate , max(base_cost) as max_base_cost, min(base_cost) as min_base_cost, max(Benchmark_Rate) as max_bm_rate, min(Benchmark_Rate) as min_bm_rate, max(Benchmark_Cost) as max_bm_cost, min(Benchmark_Cost) as min_bm_cost, max(final_rate), min(final_rate), max(final_cost), min(final_cost) from mastertable as mt  join line_item_mapping_tbl lim on lim.line_item = mt.line_item group by lim.mapped_line_item, cost_head,`Sub_Cost_Head`


select distinct cost_head,base_cost as client_cost, benchmark_cost, (base_cost - benchmark_cost) as efficiency_value, (((base_cost - benchmark_cost))/base_cost)*100 as deviation from mastertable where client_id= '1' and contract_id='1'  group by cost_head 


select cost_head,base_cost as client_cost, benchmark_cost,  ((sum(Base_Cost) - sum(Benchmark_Cost))/sum(Base_Cost))*100 as deviation  from mastertable where Client_ID = 1 and Contract_ID = 1 group by cost_head

select  ((sum(Base_Cost) - sum(Benchmark_Cost))/sum(Base_Cost))*100 as deviation  from mastertable where Client_ID = 1 and Contract_ID = 1 



select  distinct project_title , project_title_id,  production_house, brand , product, Data_Receipt_Date, report_date,DATEDIFF(STR_TO_DATE(Data_Receipt_Date,'%m/%d/%Y') ,STR_TO_DATE(report_date,'%m/%d/%Y') ) as TAT from database_structure_revised where client_id = 1 and contract_id = 1


update `database_structure_revised` set Data_Receipt_Date = '4/11/2018 14:14' where client_id = 1 and contract_id = 1


STR_TO_DATE('5/15/2012 8:06:26 AM', '%c/%e/%Y %r')


format = shoot 



select  distinct project_title , project_title_id,  production_house, brand , product, Data_Receipt_Date, report_date,DATEDIFF(STR_TO_DATE(Data_Receipt_Date,'%m/%d/%Y') ,STR_TO_DATE(report_date,'%m/%d/%Y') ) as TAT from mastertable where client_id = 1 and contract_id = 1


update `database_structure_revised` set Data_Receipt_Date = '4/11/2018 14:14' where client_id = 1 and contract_id = 1


STR_TO_DATE('5/15/2012 8:06:26 AM', '%c/%e/%Y %r')

select distinct project_title as name , project_title_id as id from mastertable where client_id = 1 and contract_id = 1

select distinct `Film_Description` as name , film_description_id  as id from mastertable where client_id = 1 and contract_id = 1 and `Project_Title_ID`=7

select distinct production_house as name, production_house_id as id from mastertable where client_id = 1 and contract_id = 1

