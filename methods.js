function dateFormatter (txt){
    return txt.split("-");
}
function timeFormatter (txt){
    return  txt.split(":");
}
function imgurlFormatter (txt){
    return txt.replace("../..", "http://aytishnik.uz").replace(" ", "%20")
}
function  someContent (txt){
    if(txt.split(".")[0].length < 100){
        return txt.split(".")[0] + "."+ txt.split(".")[1]+".";
    }
    else return txt.trim().split(".")[0]+'.';
}
module.exports = {
    dateFormatter,
    timeFormatter,
    imgurlFormatter,
    someContent
}