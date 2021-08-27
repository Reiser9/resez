import React from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';

import './Main.css';

import PageWrapper from '../../../common/PageWrappers/PageWrapper/PageWrapper.jsx';
import NavLinkButton from '../../../common/Buttons/NavLinkButton/NavLinkButton.jsx';

import Point from './Point/Point.jsx';

import {reqIsAuth} from '../../../redux/user-selectors.js';

const Main = ({isAuth}) => {
    React.useEffect(() => {
        $('.project__more').on('click', function(e){
            e.preventDefault();
            $('.content').stop().animate({ scrollTop: $('#project__more').offset().top }, 500);
        });
    }, []);

    return(
        <PageWrapper>
            <div className="main flexsh w100">
                <div className="main__text--inner flexstart w100">
                    <h1 className="main__text--title">
                        Подготовиться к ЕГЭ? Легко!
                    </h1>

                    <p className="main__text--text">
                        Практика - это самое важное! Усвоить материал поможет только она!
                    </p>

                    <div className="main__text--button--inner">
                        <NavLinkButton text={'Перейти к практике'} href={`${isAuth ? 'tests' : 'login'}`} classMore="button white__button grey main__text--button" />
                        

                        <button className="button white__button grey main__text--button project__more">
                            Подробнее о проекте
                        </button>
                    </div>
                </div>

                <div className="main__img--inner">
                    <img src="./assets/img/main-img.svg" alt="Главный экран" className="main__img" />
                </div>
            </div>

            <div id="project__more"></div>
            <Point />
        </PageWrapper>
    )
}

const mapStateToProps = (state) => {
    return{
        isAuth: reqIsAuth(state)
    }
}

export default connect(mapStateToProps, {})(Main);