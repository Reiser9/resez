import React from 'react';

import './Lvl.css';

const Lvl = ({exp, lvl}) => {
	const [allExp, setAllExp] = React.useState(""); //Всего опыта до следующего уровня
	const [progress, setProgress] = React.useState(""); //Ваш опыт

	React.useEffect(() => {
		setAllExp(450 + lvl * (900 / 2));
		setProgress(exp / allExp * 100);
	}, [lvl, exp, allExp]);

	return(
		<div className="profile__lvl--inner flexcenter w100">
			<div className="profile__lvl--img--inner">
				<img src="/assets/img/crown.svg" alt="Корона" className="profile__lvl--img" />
			</div>

			<div className="profile__lvl--content w100">
				<div className="profile__lvl">
					{lvl}
				</div>

				<div className="profile__lvl--progress">
					<div className="profile__lvl--progress--value" style={{width: + progress + "%"}}></div>
				</div>

				<div className="profile__lvl">
					{lvl + 1}
				</div>
			</div>

			<div className="profile__lvl--exp">
				Опыт: {exp}/{allExp}
			</div>
		</div>
	)
}

export default Lvl;