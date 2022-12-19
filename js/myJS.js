const myURL="https://restcountries.com/v3.1/all";
let myResults=[];
let myData=[{}];
let regionArray=[];
let regionData=[];

$(()=>{
    $("#all").click(()=>{
        console.log(myData);
        $("#res").html(getStat(myResults)+createTable1()+"<br/><br/>"+createTable2(myResults));
    })
    $("#search").click(()=>{
        const myCountry=$("#countryName").val();
        const countryData=[];
        myResults.map((item)=>{
            if(item.name.common.includes(myCountry)){
                countryData.push(item);
            }
        })
        //=myResults.filter((item)=>item.name.common.includes(myCountry));
        console.log(countryData);
        $("#res").html(getStat(countryData)+createSpecTable(countryData)+"<br/><br/>"+createTable2(countryData))
    });
})

$.ajax({
    url: myURL,
    success:(response)=>{
        myResults=response;
        
        console.log(myResults);
        
    },
    error:(error)=>{
        console.log(error)
    },
})
 
let Country={
    name:"",
    population:0,
}
function createSpecTable(data){
    
    let newTable="<table class=center>"
    newTable+=`<tr>
    <th>Country Name</th>
    <th>Number Of Citizens</th>
    </tr>`;
    data.map((item)=>{
        newTable+=`<tr>
        <td>${item.name.common}</td>
        <td>${item.population}</td>
        </tr>`;
    })
    newTable+="</table>";
    return newTable;
}
function createTable1(){
    getData();
    
    let newTable="<table class=center>"
    newTable+=`<tr>
    <th>Country Name</th>
    <th>Number Of Citizens</th>
    </tr>`;
    myData.map((item)=>{
        newTable+=`<tr>
        <td>${item.name}</td>
        <td>${item.population}</td>
        </tr>`;
    })
    newTable+="</table>";
    return newTable;
}
function getStat(data){
    let amount=data.length;
    let populationSum=0;
    data.map((item)=>{
        populationSum+=item.population;
    })
    //console.log(data.length);
    let average=populationSum/amount;
    let massage=`<p>Total countries result:${amount}<br/>Total Countries Population:${populationSum}<br/>Average Population:${average}</p>`
    return massage;
}
function getData(){
    
    myResults.map((item)=>{
        let newCountry={...Country};
        newCountry.name=item.name.common;
        newCountry.population=item.population;
        myData.push(newCountry);
    })
    console.log(myData);
}
function getRegion(data){
   data.map((item)=>{
    if(!regionArray.includes(item.region)){
        regionArray.push(item.region);
    }
   }) 
   console.log(regionArray);
   regionArray.map((item1)=>{
    regionData.push(myResults.filter((item)=>item.region===item1).length);
   })
   console.log(regionData);
}

function createTable2(data){
    
    getRegion(data);
    getData();
    let regionTable="<table class='center'>"
    regionTable+=`<tr>
    <th>Region</th>
    <th>Number of countries</th>
    </tr>`
    for(let i=0;i<regionArray.length;i++){
        regionTable+=`<tr>
        <td>${regionArray[i]}</td>
        <td>${regionData[i]}</td>
        </tr>`
    }
   /* let allRegions=[];
    regionArray.map((item)=>allRegions.push(makeRegion()))

    allRegions.map((item)=>{
        regionTable+=`<tr>
        <td>${item.name}</td>
        <td>${item.number}</td>
        </tr>`
    })*/


    
    regionTable+="</table>";
    return regionTable;


}