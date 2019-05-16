//=========================
//PUERTO
//=========================

process.env.PORT = process.env.PORT || 3000;

//=========================
//ENTORNO
//=========================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

//=========================
//Base de datos
//=========================

let urlDB;

if (process.env.NODE_ENV === 'env') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://malviaje:fRcAH1tmsnZRkGxE@cluster0-fewxj.mongodb.net/cafe';
}

process.env.URLDB = urlDB;