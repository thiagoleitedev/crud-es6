import axios from 'axios';
import Model from './model';

const host = 'http://localhost:4000';

class Controller {
	constructor() {
		this.create();
		this.render();
	};

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
						</tr> 
					</thead> 
					<tbody> 
						${response.data.map(data =>
							`<tr>
								<th scope="row">${data.id}<th>
								<td>${data.title}</td>
								<td>${data.author}</td>
							</tr>`
						).join('')}
					</tbody> 
				</table>`;
				document.querySelector(".insert-table").innerHTML = template;
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