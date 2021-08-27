import React from 'react';

const Social = ({className}) => {
	return(
		<div className={className}>
		    <a href="https://vk.com" className="sidebar__social--link" target="_Blanc">
		        <img src="./assets/img/vk.svg" alt="Вк" className="sidebar__social--icon" />
		    </a>

		    <a href="https://telegram.com" className="sidebar__social--link" target="_Blanc">
		        <img src="./assets/img/telegram.svg" alt="Телеграм" className="sidebar__social--icon" />
		    </a>

		    <a href="https://www.youtube.com" className="sidebar__social--link" target="_Blanc">
		        <img src="./assets/img/youtube.svg" alt="Ютуб" className="sidebar__social--icon" />
		    </a>

		    <a href="https://tiktok.com" className="sidebar__social--link" target="_Blanc">
		        <img src="./assets/img/tt.svg" alt="Тик ток" className="sidebar__social--icon" />
		    </a>
		</div>
	)
}

export default Social;