import axios from 'axios';
import Model from './model';

const host = 'http://localhost:4000';

class Controller {
	constructor() {
		this.render();
	};

	parseHtml(str) {
	    var domparser, doc, docfrag;
	    domparser = new DOMParser();
	    doc = domparser.parseFromString(str, 'text/html');
	    docfrag = document.createDocumentFragment();
	    doc.onclick = function() {
	    	alert("dasd");
	    };
	    docfrag.appendChild(doc.documentElement);
	    return docfrag;
	}

	elementButtonDelete() {
		let tt = this.parseHtml('<div class="btn">asd </div>');
		tt.onclick = function() {
			alert("dasd");
		};
		console.log(tt);
		document.body.appendChild(tt);
	}

	par(ee) {
		console.log(ee);
	}

	render() {
		axios.get(`${host}/posts`)
			.then( (response) => {
				
				let template =
				`<table class="table"> 
					<thead> 
						<tr> 
							<th>#</th> 
							<th>Title</th> 
							<th>Author</th> 
							<th>Actions</th>
						</tr> 
					</thead> 
					<tbody id="rr"> 
						${response.data.map(data =>
							`<tr>
								<th scope="row">${data.id}</th>
								<td>${data.title}</td>
								<td>${data.author}</td>
								<td><input class="btn btn-default" type="button" js-id="bt-delete-post" value="Excluir" /></td>
								<td><div class="teste" style="width: 100px; height: 100px; background: red;"></td>
							</tr>`
						).join('')}
					</tbody> 
				</table>`; 

				document.querySelector(".insert-table").innerHTML = template;
				this.elementButtonDelete();
				/*

				let tt = document.querySelectorAll('.bt');

				for (var i=0; i<tt.length; i++) {
					console.log(document.querySelectorAll('.bt')[i]);
				}
				
				let table = document.createElement('table');
				let thead = document.createElement('thead');
				let tbody = document.createElement('tbody');
				let th = document.createElement('th');
				let td = document.createElement('td');

				table.className = 'table';
				table.appendChild(tbody);

				response.data.map(data => {
					var tr = document.createElement('tr');
					var td = document.createElement('td');
					let elementButtonDelete = this.elementButtonDelete();

					tr.appendChild(td);
					td.appendChild(elementButtonDelete);

					tbody.appendChild(tr);
				});

				document.querySelector('.insert-table').appendChild(table);

				
				/*
				btn.onclick = function (evt) {
					console.log(evt.target);
				}
				*/
				
			})
			.catch( (error) => {
				console.log(error);
			});
	};

	create() {
		axios.post('http://localhost:4000/posts', {
			title: 'teste',
			author: 'ssdsd'
		});
	};
}

export default Controller;