import React from 'react';
import {Link} from 'react-router-dom';

import './404.css';

const NotFound = () => {
	return(
		<div className="notfound">
			<div className="notfound__inner flexcenter">
				<div className="notfound__img--inner">
					<img src="./assets/img/404.svg" alt="Страница не найдена" className="notfound__img" />
				</div>

				<h2 className="notfound__title">
					Куда я попал?
				</h2>

				<p className="notfound__text">
					Видимо, вы уже изучили каждый уголок нашего сайта и завернули куда-то не туда, скорее возвращайтесь на главную страницу!
				</p>

				<Link to={'/'} className="button notfound__button">
					На главную
				</Link>
			</div>
		</div>
	)
}

export default NotFound;