exports.authors = function(req,res){
	res.render('author', {
				fotoPerfil: '/images/pepe.bmp',
				Nombre: 'Florencio',
				Video: '/video/Para miriadas.mp4',
				errors: []
	});
};