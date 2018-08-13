'use strict'

const User = require('../models/user');
const jwt = require('../services/jwt');
const os = require('os');
const fs = require('fs');
const path = require('path');
const mongoosePaginate = require('mongoose-pagination');


function login (req, res, next) {
	let dataUser = req.body;
	User.findOne({email: dataUser.email},(err, user) => {
		if(user){
			User.findOne({email: dataUser.email, password: dataUser.password},(err, user) => { 
				if(user){
					res.json({type: 1, data: jwt.createToken(user)});
				}else{
					res.json({type: 0, data: 'El Correo Electrónico y La Contraseña Que Ingresaste No Coinciden'});
				}
			});    
		}else {
			res.json({type: 0, data: 'El Email No Existe'});
		}
	});  
}


function register (req, res, next) {
	let dataUser = req.body;
	User.findOne({email: dataUser.email},(err, user) => {
		if(user){    
			res.json({type: 0, data: 'El Email Ya Existe'});
		}else {
			// let u = new User({name: dataUser.name, lastName: dataUser.lastName, email: dataUser.email, password: dataUser.password});
			let u = new User(dataUser);
			u.save((err, user) => {
				if(user){
					User.findById({_id: user._id}, (err, u) => {
						if(u){
							res.json({type: 1, data: u});
						}else{
							res.json({type: 0, data: 'Error al Guardar El Usuario'});
						}
					})
				}else{
					res.json({type: 0, data: 'El Usuario No Se Ha Podido Registrar En La Base de Datos'});
				}
			});      
		}
	});
}


function uploadImg (req, res, next) {
	var userId = req.params.id;
	var file_name = 'No subido...';
	if(req.files){
		var file_path = req.files.image.path;
		var file_split;
		if(os.type() == 'Linux' || os.type() == 'Darwin'){
			file_split = file_path.split('/');	
		}else if (os.type() == 'Windows_NT'){
			file_split = file_path.split('\\');
		}
		var file_name = file_split[file_split.length-1];
		var ext_split = file_name.split('.')
		var ext_file = ext_split[1];
		if (ext_file == 'jpeg' || ext_file == 'jpg' || ext_file == 'png' || ext_file == 'gif') {
			User.findByIdAndUpdate(userId, {imgProfile: file_name}, (err, userUpdated) => {
				if(userUpdated){
					res.status(200).json({type: 1, data: userUpdated});
				}else{
					res.status(404).json({type: 0, data: 'No se puede actualizar el usuario'});
				}
			})
		}
		console.log('-> ',file_name);
	}else{
		res.json({type: 0, data: 'No se ha subido ninguna imagen'});		
	}
}

function prueba (req, res, next) {
  res.json({type: 0, data: 'Probandooooooo'});
}

function getImageFile(req, res, next) {
	var imageFile = req.params.imageFile;
	console.log('file: ',imageFile);
	var dir = __dirname + '/../uploads/imgs/users/' + imageFile;
	console.log('dir: ',dir);
	fs.exists(dir, function (exists) {
		if(exists){
			res.sendFile(path.resolve(dir));
		}else{
			res.status(404).json({type: 0, data: 'No existe la imagen'});
		}
	})
}

function pagination (req, res, next){
	var page = req.params.page? req.params.page : 1;
	var itemsPage = 1;

	User.find().sort('name').paginate(page, itemsPage, (err, users, total) => {
		if(err){
			res.status(500).json({type: 0, data: 'Error en la petición'});
		}else {
			if(users){
				res.status(200).json({type: 0, data: {total, users}});
			}else{
				res.status(404).json({type: 0, data: 'No hay artistas'});
			}
		}
	})
}

module.exports = {
    login,
		register,
		prueba,
		uploadImg,
		getImageFile,
		pagination
}