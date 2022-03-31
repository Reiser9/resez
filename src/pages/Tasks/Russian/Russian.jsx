import React from 'react';
import {makeStyles} from '@mui/styles';

import './Russian.css';
import {useStyles} from '../../../theme/gstyle.js';

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const useLocalStyles = makeStyles(theme => ({
	taskItem: {
		marginTop: 10,
		borderTop: `1px solid ${theme.palette.primary.main}`
	},
	tasksItemNumber: {
		background: theme.palette.primary.main,
		padding: '1rem 2rem'
	},
	tasksTableItem: {
		display: 'flex',
		border: `1px solid ${theme.palette.primary.main}`,
		borderTop: 'none',
		'&:first-child': {
			borderTop: `1px solid ${theme.palette.primary.main}`
		},
		'@media (max-width: 768px)': {
		    flexDirection: 'column'
		}
	},
	tasksTableContent: {
		padding: '1rem',
		width: '100%'
	},
	tasksTableName: {
		padding: '1rem',
		flexShrink: 0,
		width: '200px',
		borderRight: `1px solid ${theme.palette.primary.main}`,
		'@media (max-width: 768px)': {
		    borderRight: 'none',
		    borderBottom: `1px solid ${theme.palette.primary.main}`,
		    width: '100%'
		}
	}
}));

const Russian = () => {
	const gstyle = useStyles();
	const localStyle = useLocalStyles();

	const [tab, setTab] = React.useState('1');
	const handleChange = (e, val) => {
	    setTab(val);
	};

	return(
		<>
			<TabContext value={tab}>
		        <TabList sx={{minHeight: 'auto'}} classes={{flexContainer: gstyle.tabContainer, root: gstyle.tabContext}}
		        TabIndicatorProps={{style: {display: "none"}}} onChange={handleChange}>
		            <Tab label="1" value="1" sx={{mr: 1}} />
		            <Tab label="2" value="2" sx={{mr: 1}} />
		            <Tab label="3" value="3" sx={{mr: 1}} />
		            <Tab label="4" value="4" sx={{mr: 1}} />
		            <Tab label="5" value="5" sx={{mr: 1}} />
		            <Tab label="6" value="6" sx={{mr: 1}} />
		            <Tab label="7" value="7" sx={{mr: 1}} />
		            <Tab label="8" value="8" sx={{mr: 1}} />
		            <Tab label="9" value="9" sx={{mr: 1}} />
		            <Tab label="10" value="10" sx={{mr: 1}} />
		            <Tab label="11" value="11" sx={{mr: 1}} />
		            <Tab label="12" value="12" sx={{mr: 1}} />
		            <Tab label="13" value="13" sx={{mr: 1}} />
		            <Tab label="14" value="14" sx={{mr: 1}} />
		            <Tab label="15" value="15" sx={{mr: 1}} />
		            <Tab label="16" value="16" sx={{mr: 1}} />
		            <Tab label="17" value="17" sx={{mr: 1}} />
		            <Tab label="18" value="18" sx={{mr: 1}} />
		            <Tab label="19" value="19" sx={{mr: 1}} />
		            <Tab label="20" value="20" sx={{mr: 1}} />
		            <Tab label="21" value="21" sx={{mr: 1}} />
		            <Tab label="22" value="22" sx={{mr: 1}} />
		            <Tab label="23" value="23" sx={{mr: 1}} />
		            <Tab label="24" value="24" sx={{mr: 1}} />
		            <Tab label="25" value="25" sx={{mr: 1}} />
		            <Tab label="26" value="26" sx={{mr: 1}} />
		            <Tab label="27" value="27" />
		        </TabList>

		        <TabPanel value="1">
		        	<Box className={`${gstyle.w100} ${gstyle.flexstart} ${localStyle.taskItem}`}>
		        		<Typography variant="p" component="p" color="white.main" className={localStyle.tasksItemNumber}>
		        			1 задание
		        		</Typography>

		        		<Typography component="h5" variant="h6" sx={{mt: 1}}>
		        			<Typography component="span" variant="h6" sx={{fontWeight: 700}}>Формулировка задания: </Typography> Укажите варианты ответов, в которых даны верные характеристики фрагмента текста. Запишите номера этих ответов.
		        		</Typography>

		        		<Box className={`${gstyle.flexstart} ${gstyle.w100}`} sx={{mt: 2}}>
		        			<Typography variant="p" component="p">
		        				1) Проанализировать текст не читая варианты ответов(если читать после текста варианты ответов, можно запутаться)
		        			</Typography>

		        			<Typography variant="p" component="p" sx={{mt: .5}}>
		        				2) Самому сжать текст, что бы осталась только главная суть
		        			</Typography>

		        			<Typography variant="p" component="p" sx={{mt: .5}}>
		        				3) Сравнить свой текст с вариантами ответов
		        			</Typography>
		        		</Box>
		        	</Box>
		        </TabPanel>

		        <TabPanel value="2">
		        	<Box className={`${gstyle.w100} ${gstyle.flexstart} ${localStyle.taskItem}`}>
		        		<Typography variant="p" component="p" color="white.main" className={localStyle.tasksItemNumber}>
		        			2 задание
		        		</Typography>

		        		<Typography component="h5" variant="h6" sx={{mt: 1}}>
		        			<Typography component="span" variant="h6" sx={{fontWeight: 700}}>Формулировка задания: </Typography> Самостоятельно подберите (какую-то часть речи), которое должно стоять на месте пропуска в n-ом предложении текста. Запишите это местоимение.
		        		</Typography>

		        		<Box className={`${gstyle.flexstart} ${gstyle.w100}`} sx={{mt: 2}}>
		        			<Box className={`${gstyle.w100} ${localStyle.tasksTableItem}`}>
		        				<Typography variant="p" component="p" className={localStyle.tasksTableName} sx={{fontWeight: 700}}>
		        					Вводные слова:
		        				</Typography>

		        				<Box className={`${localStyle.tasksTableContent}`}>
		        					<Typography component="p" variant="p">
		        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Уверенность: </Typography> конечно, разумеется, бесспорно, несомненно, безусловно, действительно, естественно, правда, в самом деле и др.
		        					</Typography>

		        					<Typography component="p" variant="p">
		        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Неуверенность, предположение: </Typography> кажется, может быть, вероятно, очевидно, возможно, пожалуй, по-видимому, надо полагать, я думаю, надеюсь, полагаю, верно, должно быть, если я не ошибаюсь и др.
		        					</Typography>

		        					<Typography component="p" variant="p">
		        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Различные чувства: </Typography> к счастью, к удивлению, странное дело, нечего греха таить, к ужасу, к прискорбию, к общей радости и др.
		        					</Typography>

		        					<Typography component="p" variant="p">
		        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Источник сообщения: </Typography> передают, говорят, слышно, как известно, по-моему, по сообщению, на мой взгляд, по словам, помнится и др.
		        					</Typography>

		        					<Typography component="p" variant="p">
		        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Оформление мыслей: </Typography> во-первых, значит, итак, следовательно, словом, наконец, точнее, короче говоря, лучше сказать, наоборот, например, между прочим, кстати, таким образом, с одной стороны и др.
		        					</Typography>

		        					<Typography component="p" variant="p">
		        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Ссылка на обычность: </Typography> как всегда, по обычаю, по обыкновению, бывает, случается, бывало, как водится и др.
		        					</Typography>

		        					<Typography component="p" variant="p">
		        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Оценка меры сообщаемого: </Typography> самое большее, самое меньшее, по крайней мере, без преувеличений и др.
		        					</Typography>

		        					<Typography component="p" variant="p">
		        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Выражение экспрессии: </Typography> по правде, кроме шуток, по совести, по справедливости, надо признаться, сказать по чести, между нами говоря и др.
		        					</Typography>

		        					<Typography component="p" variant="p">
		        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Привлечение внимания: </Typography> пожалуйста, извините, послушайте, представьте себе, скажем, предположим, поверь, веришь ли и др.
		        					</Typography>
		        				</Box>
		        			</Box>

		        			<Box className={`${gstyle.w100} ${localStyle.tasksTableItem}`}>
		        				<Typography variant="p" component="p" className={localStyle.tasksTableName} sx={{fontWeight: 700}}>
		        					Подчинительные союзы:
		        				</Typography>

		        				<Box className={`${localStyle.tasksTableContent}`}>
		        					<Typography component="p" variant="p">
		        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Что, </Typography> как, чтобы, будто, ли(частица в роли союза)
		        					</Typography>

		        					<Typography component="p" variant="p">
		        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Когда, </Typography> в то время как, как только, между тем как, лишь, лишь только, едва лишь, пока
		        					</Typography>

		        					<Typography component="p" variant="p">
		        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Потому что, </Typography> оттого что, ибо, так как, из-за того что, благодаря тому что, вследствие того что, в связи с тем что
		        					</Typography>

		        					<Typography component="p" variant="p">
		        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Чтобы (чтоб), </Typography> дабы, для того чтобы, с тем чтобы
		        					</Typography>

		        					<Typography component="p" variant="p">
		        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Если (если то), </Typography> если бы, ежели, ежели бы, коли(коль), когда, когда бы, раз
		        					</Typography>

		        					<Typography component="p" variant="p">
		        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Хотя (хоть), </Typography> хотя бы, пусть, даром что, несмотря ни на что, невзирая на то что
		        					</Typography>

		        					<Typography component="p" variant="p">
		        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Как, </Typography> как бы, как будто, будто, будто бы, словно, словно как, точно
		        					</Typography>

		        					<Typography component="p" variant="p">
		        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Так что </Typography>
		        					</Typography>
		        				</Box>
		        			</Box>

		        			<Box className={`${gstyle.w100} ${localStyle.tasksTableItem}`}>
		        				<Typography variant="p" component="p" className={localStyle.tasksTableName} sx={{fontWeight: 700}}>
		        					Сочинительные союзы:
		        				</Typography>

		        				<Box className={`${localStyle.tasksTableContent}`}>
		        					<Typography component="p" variant="p">
		        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Соединительные: </Typography> и, да(в значении "и"), тоже, также, ни ... ни, не только ... но и, если не ... то, не столько ... сколько, как ... так и, не то что ... а, хотя и ... но
		        					</Typography>

		        					<Typography component="p" variant="p">
		        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Противительные: </Typography> а, да (в значении "но"), но, однако, зато, же, только(в значении "но")
		        					</Typography>

		        					<Typography component="p" variant="p">
		        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Разделительные: </Typography> или, либо, то ... то, не то ... не то, то ли ... то ли
		        					</Typography>
		        				</Box>
		        			</Box>
		        		</Box>
		        	</Box>
		        </TabPanel>

		        <TabPanel value="3">
		        	<Box className={`${gstyle.w100} ${gstyle.flexstart} ${localStyle.taskItem}`}>
		        		<Typography variant="p" component="p" color="white.main" className={localStyle.tasksItemNumber}>
		        			3 задание
		        		</Typography>

		        		<Typography component="h5" variant="h6" sx={{mt: 1}}>
		        			<Typography component="span" variant="h6" sx={{fontWeight: 700}}>Формулировка задания: </Typography> Прочитайте фрагмент словарной статьи, в которой приводятся значения слова, выделенного 
		        			в n-ом предложении текста. Определите значение, в котором это слово употреблено в тексте. Выпишите цифру, соответствующую этому значению 
		        			в приведённом фрагменте словарной статьи.
		        		</Typography>

		        		<Box className={`${gstyle.flexstart} ${gstyle.w100}`} sx={{mt: 2}}>
		        			<Typography variant="p" component="p">
		        				1) Внимательно прочитать текст и понять для себя, в каком смысле употреблено слово
		        			</Typography>

		        			<Typography variant="p" component="p" sx={{mt: .5}}>
		        				2) Образать внимание на примеры к каждому пункту вариантов ответов, чаще всего курсивом отмечен верный вариант ответов, либо же идентичный пример, как и в тексте
		        			</Typography>
		        		</Box>
		        	</Box>
		        </TabPanel>

		        <TabPanel value="4">
		        	<div className="tasks__item flexstart w100">
		        		<div className="tasks__item--number">
		        			4 задание
		        		</div>

		        		<div className="tasks__item--title w100">
		        			<span className="bold">Формулировка задания: </span> В каком слове допущена ошибка в постановке ударения: 
		        			НЕВЕРНО выделена буква, обозначающая ударный гласный звук? Выпишите это слово.
		        		</div>

		        		<div className="tasks__item--content flexstart w100">
		        			<p className="tasks__item--text">
		        				<span className="bold">Существительные:</span> агЕнт, агронОмия, агЕнтство, агОния, адАптер, адюльтЕр, айвА, акрОполь, алкогОль, алфавИт, Амфора, анАпест, анАлог, анАтом, аннЕксия, антитЕза, 
		        				анорАк, апострОф, апОкриф, арбУз, аргумЕнт, арЕст, аристокрАтия, асимметрИя, астронОм, астронОмия, асбЕст, Атлас(карты), атлАс(ткань), аудИтор, афЕра, 
		        				аэропОрты(в аэропортУ, об аэропОрте), аэрОграф, афИнянин, баловнИк, бАнты(бАнта), бАзис, бадьЯ, бАрмен, бахчА, батрАк, бУнгало, блАговест, бОроду, брОня(билетов), 
		        				бронЯ(защита), бУлочная, буржуазИя, бутербрОд (тэ), бухгАлтеров, вахтЁр, ваЯтель, векселЯ, вЕрба, вЕчеря, вандАлы, вдовствО, ветеринАрия, водопровОд, газопровОд, 
		        				мусоропровОд и т.д., вОзраст-вОзрасты-вОзрастов, вОлка, вОлки, волкОв, вОра, вОры, ворОв, ворАм, о ворАх, ворОта, ворожеЯ, гастронОмия, гегемОния, гомеопАтия, гектАр, 
		        				гЕнезис, гравЁр, граждАнство, гренадЕр, глашАтай, граффИти, грЕнкИ, дерматИн, дЕспот(де), деспотИя, дефИс, дешевИзна, деЯние, диАгноз, диалОг, добЫча, дОгмат, договОр, 
		        				докумЕнт, досУг, драматургИя, дремОта, духовнИк, еретИк, жерлО, житиЕ, жЁлоб, зАговор(тайное соглашение), заговОр(заклинание), заЁм, закУпорка, закУток, зевОта, 
		        				зимОвщик, злОба, знАмение, знАхарство (знАхарка и знахАрка), знАчимость, Игрище, игУмен, иерОглиф, изобретЕние, Иконопись, Иксы, инженЕрия, индустрИя, инструмЕнт, 
		        				инсУльт, без инструктАжа, Искра, кАмбала, каталОг, кАтарсис, катастрОфа, каучУк, квартАл, киломЕтр, кинематогрАфия, кладовАя, коклЮш, кОлледж, коллЕж, колОсс, кОмпас, 
		        				кОнус(кОнусы) кОнусов, корЫсть, крАны, крапИва, кремЕнь, кУхонный, кулинарИя, лассО, лАцкан, лЕктор(лЕкторов), ломОта, ломОть, лОпасть, лОскут(отходы), лосКут(кусок ткани), 
		        				лыжнЯ, мАркетинг, мастерствО, медикамЕнты, мЕстностей, мещанИн, молодЁжь, молОчник, молОх, монолОг, мусоропровОд, муштрА, мЫтарь- мытАрство, намЕрение, нарОст, недоИмка, 
		        				нЕдруг, недУг, некролОг, немотА, нЕнависть, несессЕр, нефтепровОд, низИна, нОвости, новостЕй, нОготь( нОгтя), обеспЕчение, ортопЕдия, Отрочество, остриЁ, паралИч, пАсквиль, 
		        				пАхота, патриархИя(патриАрхия), пепелИще, пЕтля (петлЯ), платО, пУстошь, плАнер(планЁр), портфЕль, пОручни, постамЕнт, побасЁнка, пОхороны (похорОн, на похоронАх), пОчестей, 
		        				пЕрвенец, приговОр, придАное, призЫв, призывнИк, прИнцип, приобретЕние, прирОст, простынЯ, процЕнт, псевдонИм, пулОвер, рАкурс, ракУшка(допуст. рАкушка), ревЕнь, ремЕнь, рефлЕксия, 
		        				рОзги, рУсло, сабО, санитарИя, сантимЕтр, свЁкла, свИтер, сИлос, синергИя, симмЕтрия(симметрИя), сиротА (сирОты), скАнер, скворЕчник(шн), слУчай, созЫв призЫв, сосредотОчение, 
		        				соболЕзнование, срЕдство (срЕдства), стАтуя, стеногрАфия, столЯр, стрЕсс, тамОжня, танцОвщица, тендЕнция, тЕндер, тОрты, тОждество, тунИка, толИка, тУфля, твОрОг, узаконЕние, 
		        				упрОчение, Уникум, фАбула, факсИмиле, фарфОр, фенОмен(научное явление), феномЕн(редкое явление), фетИш, филИстер, филантрОпия, флюрогрАфия, фОртель, фОрзац, хАос (допуст хаОс), 
		        				хлОпок, хозЯин-хозЯева, ходАтайство, хОлодность, христианИн, цемЕнт, цЕнтнер, цепОчка, цыгАн, чИстильщик, черпАлка, чЕлюстей, шАрфы шАрфа шАрфы, шассИ, шАхтинцы, шинЕль(не), 
		        				шофЁр, шпрИцы, шрИфт-шрИфта, щавЕль, щЕбень, щепА, щепОтка-щепОть, щЁлка, Экскурс, Экспорт, эскОрт, эпилОг, яИчница(шн), Ясли-Яслей
		        			</p>

		        			<p className="tasks__item--text">
		        				<span className="bold">Глаголы на -ировать:</span> баллотИровать, блокИровать, дозИровать, забронИровать (забронировАть)-зависит от значения, информИровать и т.д, опломбировАть, премировАть, формировАть, 
		        				бомбардировАть, гравировАть, гримировАть, нормировАть, сортировАть, пломбировАть, ретировАться, экипировАть
		        			</p>

		        			<p className="tasks__item--text">
		        				<span className="bold">Глаголы на -ить:</span> благоволИть, варИть( вАрит, вАришь, вАрят, варЯщий), включИть (включИт, включАт), вручИть (вручИт), вложИть, всполошИть, дозвонИться( звонИть, позвонИть, 
		        				звонИт и т.д), жИться-жилОсь, запорошИть, исключИть-исключИт, наделИть-наделИт, накренИться – накренИтся, насорИть-насорИт, облегчИть-облегчИт, ободрИть, обострИть, одолжИть-одолжИт, окружИть-окружИт, 
		        				оперИться, плодоносИть-плодонОсит-плодоносИл, повторИть-повторИт и т.д., положИть-положИл, сверлИть-сверлИт-сверлИшь, сорИть-сорИт, убыстрИть, углубИть, укрепИть-укрепИт, щемИть-щемИт, опОшлить-опОшлит, 
		        				озлОбить, оклЕить, освЕдомить-освЕдомишь, откУпорить - закУпорить(закУпорка и т.д.) откУпоривать, отвОрит, принУдить, тЕплиться, улУчшить, оцЕнит, предвосхИтить
		        			</p>

		        			<p className="tasks__item--text">
		        				<span className="bold">Глаголы на -ла:</span> бралА бралАсь, взялА взялАсь, влИться(влилАсь), ворвАться (ворвалАсь), вопринЯть( воспринялА), воссоздАть (воссоздалА), гнАть-гналА, гнАться-гналАсь, 
		        				добрАть –добралА, добрАться-добралАсь, дождАться-дождалАсь, лгАть-лгалА, лить-лилАсь, надорвАться – надорвалАсь, назвАться-назвалАсь, налИть-налилА, нарвАть-нарвалА, облИться-облилАсь, обнЯться – обнялАсь, 
		        				обогнАть-обогналА, ободрАть-ободралА, отбЫть-отбылА, отдАть-отдалА, отозвАть-отозвалА-отозвалАсь, перелИть-перелилА, позвАть-позвалА, создАть-создалА, сорвАть-сорвалА, убрАть-убралА, клАла, послАла, постлАла, 
		        				слАла крАлась прислАла укрАла, баловАть
		        			</p>

		        			<p className="tasks__item--text">
		        				<span className="bold">Другие глаголы:</span> чЕрпать -исчЕрпать, занЯть –зАнял, занялА, зАняло, зАняли, понЯть-понялА-понЯвший-понЯв, принЯть — прИнял — принялА — прИняло — прИняли; принЯвший; прИнятый; 
		        				прИнят — принятА — прИнято — прИняты; принЯв, задАть—зАдал—задалА—зАдало—зАдали; задАвший; зАданный; зАдан—заданА—зАдано—зАданы; задАв, допИть—дОпил—допилА—дОпило—дОпили; допИвший; дОпитый; дОпит—допитА—дОпито—дОпиты;
		        				допИв, начАть—нАчал—началА—нАчало—нАчали; начАвший; нАчатый; нАчат—начатА—нАчато—нАчаты; начАв, нажИть—нАжил—нажилА—нАжило—нАжили; нажИвший; нАжитый; нАжит—нажитА—нАжито—нАжиты; нажИв, прибЫть—прИбыл—прибылА—прИбыло—прИбыли;
		        				прибЫвший; прибЫв, вЫлила, заперЕться- заперлАсь, заржАвЕть, началсЯ, нажИлся, багровЕть, плЕсневеть, ржАвЕть, заИндЕветь, ходАтайствовать, щЁлкать, ЮркнУть, упомянУть, разминУться, стрельнУ, премИнуть, кАшлянуть
		        			</p>

		        			<p className="tasks__item--text">
		        				<span className="bold">Прилагательные:</span> аудитОрный, балОванный, безУдЕржный, бредОвый-бредовОй, валовОй, вернА, волгодОнский, вОгнутый, гладкошЁрстный, грУшевый, давнИшний, дЕвичий (устар. девИчий, договОрный, 
		        				зАнятый (чем-то), занятОй (человек), зубчАтый, избалОванный, кедрОвый, кожЕвенный, красИвее-красИвейший, кровоточАщий, кУхонный, ловкА, лососЁвый, лубОчный, мИзЕрный, мозаИчный, никчЁмный, неприхотлИвый, одноимЁнный,
		        				оптОвый, пломбИруют, повАренная соль, полУденный, призывнОй(пункт, возраст), призЫвный (зовущий), прожОрлива, прозорлИва-прозорлИвый, равнО, смазлИва, суетлИва, соплемЕнный, слИвовый, Угольный, угОльный, украИнский,
		        				флЕйтовый, характЕрный(типичный), харАктерный (актер), хОленый хОленный (но холЁный), шАхтинский, щегольскОй, юрОдивый, языковОй( язык-речь), языкОвый (орган), яИчный
		        			</p>

		        			<p className="tasks__item--text">
		        				<span className="bold">Наречия:</span> вОвремя, втрИдорога, добелА, доголА, дочернА, докраснА, дОверху, дОнизу, дОсиня, дОсуха, донагА, донЕльзя, зАсветло, зАтемно, завИдно, задОлго, издавна, изредка, исстари, исподволь,
		        				исконИ, мастерскИ, мЕльком, нАбело (допуст. набелО), надОлго, нАголо (допуст. наголО), ненадОлго, наОтмашь, неподалЁку, отчАсти
		        			</p>

		        			<p className="tasks__item--text">
		        				<span className="bold">Причастия:</span> включЁнный, заключЁнный, исключЁнный, отключЁнный, взбешЁнный, углублЁнный, укреплЁнный, вручЁнный, приручЁнный, облегчЁнный, ободрЁнный, обострЁнный, убыстрЁнный, повторЁнный,
		        				наделЁнный, поделЁнный, приручЁнный, привнесЁнный, определЁнный, окружЁнный, возбуждЁнный, награждЁнный, накренЁнный, новорождЁнный, заселЁнный, оценЁнный, отворЁнный, одОлженный. улУчшенный, кОлотый, пОлотый, сОгнутый,
		        				пОгнутый, изОгнутый, зАгнутый, завЁрнутый, Обнятый, пОнятый, понятОй, пОднятый, упомЯнутый, прОткнутый, предпрИнятый, нагнУтый, нАчатый, зАпертый запертА, знАчимый, обнЯвший, свЕдущий, варЯщийся, манЯщий, молЯщий, кровоточАщий,
		        				кормЯщий, могУщий (от глагола мочь), инсценИрованный, экипирОванный, понЯвший, умЕрший
		        			</p>

		        			<p className="tasks__item--text">
		        				<span className="bold">Деепричастия:</span> балУясь, закУпорив, начАв, начАвшись, отдАв, поднЯв, понЯв, прибЫв
		        			</p>

		        			<p className="tasks__item--text">
		        				<span className="bold">"Ударяемые" предлоги (ударение на предлог при произношении): на:</span> нА воду, на ногу, на гору, на руку, на зиму, на год, на нос, на день, на ночь; под: пОд ноги, под руки, под гору, под вечер; по: пО морю, по полю, по лесу, по полу, по носу, по два, по три,
		        				по сто, по двое, по трое; из: Из лесу, из дому, из носу, из виду; без: бЕз вести, без толку, без году неделя
		        			</p>
		        		</div>
		        	</div>
		        </TabPanel>

		        <TabPanel value="5">
		        	<div className="tasks__item flexstart w100">
		        		<div className="tasks__item--number">
		        			5 задание
		        		</div>

		        		<div className="tasks__item--title w100">
		        			<span className="bold">Формулировка задания: </span> В одном из приведённых ниже предложений НЕВЕРНО употреблено выделенное слово. 
		        			Исправьте лексическую ошибку, подобрав к выделенному слову пароним. Запишите подобранное слово.
		        		</div>

		        		<div className="tasks__item--content flexstart w100">
		        			<div className="tasks__table--item--full flexstart w100">
		        				<p className="tasks__item--text">
		        					<span className="bold">Абонемент</span> - право пользования чем-либо (или документ, предоставляющий это право) на определённый срок: абонемент в бассейн.
		        				</p>

		        				<p className="tasks__item--text">
		        					<span className="bold">Абонент</span> - лицо или учреждение, имеющее абонемент: абонент телефонной сети.
		        				</p>
		        			</div>

		        			<div className="tasks__table--item--full flexstart w100">
		        				<p className="tasks__item--text">
		        					<span className="bold">Адресат</span> – лицо или организация, кому адресовано почтовое отправление (получатель).							</p>

		        				<p className="tasks__item--text">
		        					<span className="bold">Адресант</span> – лицо или организация, посылающие почтовое отправление (отправитель).
		        				</p>
		        			</div>
		        		</div>
		        	</div>
		        </TabPanel>

		        <TabPanel value="6">
		        	<div className="tasks__item flexstart w100">
		        		<div className="tasks__item--number">
		        			6 задание
		        		</div>

		        		<div className="tasks__item--title w100">
		        			<span className="bold">Формулировка задания: </span> Отредактируйте предложение: исправьте лексическую ошибку, заменив неверно употреблённое слово. Запишите подобранное слово, соблюдая нормы современного русского литературного языка.
		        		</div>

		        		<div className="tasks__item--content flexstart w100">
		        			<p className="tasks__item--text">
		        				Правил особых нет, поэтому нужно нарешивать и наблюдать эти случаи
		        			</p>

		        			<p className="tasks__item--text">
		        				<span className="bold">Исключите лишнее слово:</span> внимательно наблюдаем за каждыми рядом стоящими словами
		        			</p>

		        			<p className="tasks__item--text">
		        				<span className="bold">Замените лишнее слово:</span> ищем слово, которое не подходит по значению, архаизм, деалект
		        			</p>
		        		</div>
		        	</div>
		        </TabPanel>

		        <TabPanel value="7">
		        	<div className="tasks__item flexstart w100">
		        		<div className="tasks__item--number">
		        			7 задание
		        		</div>

		        		<div className="tasks__item--title w100">
		        			<span className="bold">Формулировка задания: </span> В одном из выделенных ниже слов допущена ошибка в образовании формы слова. Исправьте ошибку и запишите слово правильно.
		        		</div>

		        		<div className="tasks__item--content flexstart w100">
		        			<div className="tasks__item--wrapper flexstart w100">
		        				<div className="tasks__table--item--full w100 textcenter">
		        					<p className="tasks__item--text bold">Слова на -тор, -сор,-вор, -ер</p>
		        				</div>

		        				<div className="tasks__item--inner w100">
		        					<div className="tasks__item--half--inner flexstart">
		        						<div className="tasks__item--half textcenter w100">
		        							<p className="tasks__item--text bold">Ы, И</p>
		        						</div>

		        						<div className="tasks__item--half textcenter w100">
		        							<p className="tasks__item--text">
		        								инструкторы
		        							</p>

		        							<p className="tasks__item--text">
		        								редакторылекторы
		        							</p>

		        							<p className="tasks__item--text">
		        								ректоры
		        							</p>

		        							<p className="tasks__item--text">
		        								конструкторы
		        							</p>

		        							<p className="tasks__item--text">
		        								прожекторы
		        							</p>

		        							<p className="tasks__item--text">
		        								секторы
		        							</p>

		        							<p className="tasks__item--text">
		        								инженеры
		        							</p>

		        							<p className="tasks__item--text">
		        								шофёры
		        							</p>

		        							<p className="tasks__item--text">
		        								бухгалтеры
		        							</p>

		        							<p className="tasks__item--text">
		        								диспетчеры
		        							</p>

		        							<p className="tasks__item--text">
		        								договоры
		        							</p>

		        							<p className="tasks__item--text">
		        								приговоры
		        							</p>

		        							<p className="tasks__item--text">
		        								плейеры
		        							</p>

		        							<p className="tasks__item--text">
		        								драйверы
		        							</p>

		        							<p className="tasks__item--text">
		        								принтеры
		        							</p>
		        						</div>
		        					</div>

		        					<div className="tasks__item--half--inner flexstart">
		        						<div className="tasks__item--half textcenter w100">
		        							<p className="tasks__item--text bold">А, Я</p>
		        						</div>

		        						<div className="tasks__item--half textcenter w100">
		        							<p className="tasks__item--text">
		        								директора
		        							</p>

		        							<p className="tasks__item--text">
		        								профессора
		        							</p>

		        							<p className="tasks__item--text">
		        								инспектора
		        							</p>

		        							<p className="tasks__item--text">
		        								доктора
		        							</p>

		        							<p className="tasks__item--text">
		        								катера
		        							</p>

		        							<p className="tasks__item--text">
		        								ордера
		        							</p>

		        							<p className="tasks__item--text">
		        								тенора
		        							</p>

		        							<p className="tasks__item--text">
		        								фельдшера
		        							</p>

		        							<p className="tasks__item--text">
		        								флюгера
		        							</p>

		        							<p className="tasks__item--text">
		        								хутора
		        							</p>

		        							<p className="tasks__item--text">
		        								шулера
		        							</p>

		        							<p className="tasks__item--text">
		        								буфера
		        							</p>

		        							<p className="tasks__item--text">
		        								веера
		        							</p>

		        							<p className="tasks__item--text">
		        								буера
		        							</p>

		        							<p className="tasks__item--text">
		        								повара
		        							</p>
		        						</div>
		        					</div>
		        				</div>
		        			</div>

		        			<div className="tasks__item--wrapper flexstart w100">
		        				<div className="tasks__table--item--full w100 textcenter">
		        					<p className="tasks__item--text bold">Слова на -ля</p>
		        				</div>

		        				<div className="tasks__item--inner w100">
		        					<div className="tasks__item--half--inner flexstart">
		        						<div className="tasks__item--half textcenter w100">
		        							<p className="tasks__item--text">
		        								грифели
		        							</p>

		        							<p className="tasks__item--text">
		        								госпитали
		        							</p>
		        						</div>
		        					</div>

		        					<div className="tasks__item--half--inner flexstart">
		        						<div className="tasks__item--half textcenter w100">
		        							<p className="tasks__item--text">
		        								векселя
		        							</p>

		        							<p className="tasks__item--text">
		        								вензеля
		        							</p>

		        							<p className="tasks__item--text">
		        								кителя
		        							</p>

		        							<p className="tasks__item--text">
		        								штабеля
		        							</p>

		        							<p className="tasks__item--text">
		        								штемпеля
		        							</p>

		        							<p className="tasks__item--text">
		        								тополя
		        							</p>

		        							<p className="tasks__item--text">
		        								шомпола
		        							</p>

		        							<p className="tasks__item--text">
		        								колокола
		        							</p>

		        							<p className="tasks__item--text">
		        								купола
		        							</p>
		        						</div>
		        					</div>
		        				</div>
		        			</div>

		        			<div className="tasks__item--wrapper flexstart w100">
		        				<div className="tasks__table--item--full w100 textcenter">
		        					<p className="tasks__item--text bold">Остальные слова</p>
		        				</div>

		        				<div className="tasks__item--inner w100">
		        					<div className="tasks__item--half--inner flexstart">
		        						<div className="tasks__item--half textcenter w100">
		        							<p className="tasks__item--text">
		        								слесари
		        							</p>

		        							<p className="tasks__item--text">
		        								токари
		        							</p>

		        							<p className="tasks__item--text">
		        								конюхи
		        							</p>

		        							<p className="tasks__item--text">
		        								возрасты
		        							</p>

		        							<p className="tasks__item--text">
		        								кремы
		        							</p>

		        							<p className="tasks__item--text">
		        								супы
		        							</p>

		        							<p className="tasks__item--text">
		        								грунты
		        							</p>

		        							<p className="tasks__item--text">
		        								лифты
		        							</p>

		        							<p className="tasks__item--text">
		        								порты
		        							</p>

		        							<p className="tasks__item--text">
		        								склады
		        							</p>

		        							<p className="tasks__item--text">
		        								торты
		        							</p>

		        							<p className="tasks__item--text">
		        								флоты
		        							</p>

		        							<p className="tasks__item--text">
		        								фронты
		        							</p>

		        							<p className="tasks__item--text">
		        								штабы
		        							</p>

		        							<p className="tasks__item--text">
		        								штурманы
		        							</p>
		        						</div>
		        					</div>

		        					<div className="tasks__item--half--inner flexstart">
		        						<div className="tasks__item--half textcenter w100">
		        							<p className="tasks__item--text">
		        								адреса
		        							</p>

		        							<p className="tasks__item--text">
		        								бока
		        							</p>

		        							<p className="tasks__item--text">
		        								борта
		        							</p>

		        							<p className="tasks__item--text">
		        								века
		        							</p>

		        							<p className="tasks__item--text">
		        								жемчуга
		        							</p>

		        							<p className="tasks__item--text">
		        								жернова
		        							</p>

		        							<p className="tasks__item--text">
		        								края
		        							</p>

		        							<p className="tasks__item--text">
		        								желоба
		        							</p>

		        							<p className="tasks__item--text">
		        								кузова
		        							</p>

		        							<p className="tasks__item--text">
		        								окорока
		        							</p>

		        							<p className="tasks__item--text">
		        								округа
		        							</p>

		        							<p className="tasks__item--text">
		        								острова
		        							</p>

		        							<p className="tasks__item--text">
		        								отпуска
		        							</p>

		        							<p className="tasks__item--text">
		        								паруса
		        							</p>

		        							<p className="tasks__item--text">
		        								паспорта
		        							</p>

		        							<p className="tasks__item--text">
		        								погреба
		        							</p>

		        							<p className="tasks__item--text">
		        								потроха
		        							</p>

		        							<p className="tasks__item--text">
		        								снега
		        							</p>

		        							<p className="tasks__item--text">
		        								стога
		        							</p>

		        							<p className="tasks__item--text">
		        								сорта
		        							</p>

		        							<p className="tasks__item--text">
		        								сторожа
		        							</p>

		        							<p className="tasks__item--text">
		        								тетерева
		        							</p>

		        							<p className="tasks__item--text">
		        								черепа
		        							</p>
		        						</div>
		        					</div>
		        				</div>
		        			</div>
		        		</div>
		        	</div>
		        </TabPanel>

		        <TabPanel value="8">
		        	<div className="tasks__item flexstart w100">
		        		<div className="tasks__item--number">
		        			8 задание
		        		</div>

		        		<div className="tasks__item--title w100">
		        			<span className="bold">Формулировка задания: </span> Установите соответствие между грамматическими ошибками и предложениями, в которых они допущены: к каждой позиции первого столбца подберите соответствующую позицию из второго столбца.
		        		</div>

		        		<div className="tasks__item--content flexstart w100">
		        			<div className="tasks__table--item w100">
		        				<div className="tasks__table--name bold">
		        					Неправильное употребление падежной формы существительного с предлогом
		        				</div>

		        				<div className="tasks__table--content">
		        					<p className="tasks__table--text">
		        						После 6 предлогов: благодаря, согласно, вопреки, подобно, наперекор, наперерез; Слово должно стоять в <span className="bold">дательном падеже</span>
		        					</p>

		        					<p className="tasks__table--text">
		        						<span className="bold">Например: </span> согласно правилу, подобно учению, благодаря людям
		        					</p>

		        					<p className="tasks__table--text">
		        						Предлог "по" в значении "после чего-либо" употребляется с именем существительным только в форме <span className="bold">предложного падежа</span>, а не дательного
		        					</p>

		        					<p className="tasks__table--text">
		        						<span className="bold">Например:</span> по прибытии, по приезде, по завершении, по окончании, по истечении, по прилете
		        					</p>
		        				</div>
		        			</div>

		        			<div className="tasks__table--item w100">
		        				<div className="tasks__table--name bold">
		        					Нарушение в построении предложения с несогласованным приложением
		        				</div>

		        				<div className="tasks__table--content">
		        					<p className="tasks__table--text">
		        						Чаще всего эта ошибка встречается в названии чего либо, к примеру книги, произведения, озера и т.д
		        					</p>

		        					<p className="tasks__table--text">
		        						Если перед названием чего либо есть определяющее слово, к примеру: в <span className="bold">картине</span> "спящий пастушок", тут есть определяющее слово: "Картина", значит название будет в <span className="bold">именительном падеже</span>
		        					</p>

		        					<p className="tasks__table--text">
		        						Если же нет определяющего слова, например: в "спящем пастушке", тогда название склоняется взависимости от предлога перед ним
		        					</p>
		        				</div>
		        			</div>

		        			<div className="tasks__table--item w100">
		        				<div className="tasks__table--name bold">
		        					Нарушение связи между подлежащим и сказуемым
		        				</div>

		        				<div className="tasks__table--content">
		        					<p className="tasks__table--text">
		        						1) Знать расшифровки аббривеатур, к примеру ООН - Организация Объеденённых Наций, женский род, следовательно будет: "ООН объявила", а не объявил или объявило
		        					</p>

		        					<p className="tasks__table--text">
		        						2) Следующее нужно запомнить. Если у Вас будет похожее предложение: "<span className="bold">ВСЕ, КТО</span> интересуется театром, <span className="bold">ЗНАЮТ</span> имя Алексея Бахрушина", Либо вместо ВСЕ КТО будет ТЕ КТО и др., то нужно знать, во внутренней части предложения, "Кто интересуется театром", должно быть в единственном числе, а после внутренней части "Все ... Знают", должно быть в множественном числе
		        					</p>
		        				</div>
		        			</div>

		        			<div className="tasks__table--item w100">
		        				<div className="tasks__table--name bold">
		        					Неправильное построение предложения с косвенной речью
		        				</div>

		        				<div className="tasks__table--content">
		        					<p className="tasks__table--text">
		        						При переводе прямой речи в косвенную местоимения и глаголы в форме 1 лица следует заменить местоимениями и глаголами 3 лица.
		        					</p>

		        					<p className="tasks__table--text">
		        						<span className="bold red">Неправильно</span>: "Автор утверждает, что я это знаю, а не просто предполагаю." (смешение прямой и косвенной речи)
		        					</p>

		        					<p className="tasks__table--text">
		        						<span className="bold green">Правильно</span>: "Автор утверждает, что он это знает, а не просто предполагает."
		        					</p>
		        				</div>
		        			</div>

		        			<div className="tasks__table--item w100">
		        				<div className="tasks__table--name bold">
		        					Ошибка в построении предложения с однородными членами
		        				</div>

		        				<div className="tasks__table--content">
		        					<p className="tasks__table--text">
		        						1) Каждый из однородных членов должен быть грамматически соотнесён с общим словом.
		        					</p>

		        					<p className="tasks__table--text">
		        						2) Каждый из однородных членов должен быть лексически соотнесён с общим словом.
		        					</p>

		        					<p className="tasks__table--text">
		        						3) Если однородные члены - прилагательные или причастия, они должны быть оба в одной форме (полной или краткой).
		        					</p>

		        					<p className="tasks__table--text">
		        						4) Если перед однородными членами предполагаются разные предлоги, то их нельзя опускать.
		        					</p>

		        					<p className="tasks__table--text">
		        						5) Все однородные члены должны стоять в том же падеже, что и обобщающее слово.
		        					</p>

		        					<p className="tasks__table--text">
		        						6) Нельзя смешивать родо-видовые понятия в ряду однородных членов.
		        					</p>

		        					<p className="tasks__table--text">
		        						7) Нарушен порядок слов при использовании двойных союзов (Как…, так и…; не только…, но и…; если не…, то…; не столько…, сколько…; не то чтобы…, а….), повторяющихся союзов (то... то; не то... не то и др.). Части таких союзов должны стоять непосредственно рядом с однородными членами!
		        					</p>

		        					<p className="tasks__table--text">
		        						8) Части двойного союза постоянны, их нельзя заменять другими словами: не только … но и, если не…, то, как…, так и
		        					</p>
		        				</div>
		        			</div>

		        			<div className="tasks__table--item w100">
		        				<div className="tasks__table--name bold">
		        					Нарушение в построении предложения с причастным оборотом
		        				</div>

		        				<div className="tasks__table--content">
		        					<p className="tasks__table--text">
		        						1) Причастие с определяемым словом должно быть согласовано в роде, числе и падеже.
		        					</p>

		        					<p className="tasks__table--text">
		        						<span className="bold red">Неправильно</span>: Мы гордимся нашими футболистами (Т.П.), победивших (Р.П.) английскую команду
		        					</p>

		        					<p className="tasks__table--text">
		        						<span className="bold green">Правильно</span>: Мы гордимся нашими футболистами (Т.П.), победившими (Р.П.) английскую команду
		        					</p>

		        					<p className="tasks__table--text">
		        						2) Определяемое слово не должно входить в причастный оборот.
		        					</p>

		        					<p className="tasks__table--text">
		        						<span className="bold red">Неправильно</span>: Приготовленные оладьи мамой были необыкновенно вкусны.
		        					</p>

		        					<p className="tasks__table--text">
		        						<span className="bold green">Правильно</span>: Оладьи, приготовленные мамой, были необыкновенно вкусны.
		        					</p>

		        					<p className="tasks__table--text">
		        						3) Не должно быть замены действительного причастия на страдательное.
		        					</p>

		        					<p className="tasks__table--text">
		        						<span className="bold red">Неправильно</span>: Задание, выполняющееся нами, не вызывает особых затруднений.
		        					</p>

		        					<p className="tasks__table--text">
		        						<span className="bold green">Правильно</span>: Задание, выполняемое нами, не вызывает особых затруднений.
		        					</p>
		        				</div>
		        			</div>

		        			<div className="tasks__table--item w100">
		        				<div className="tasks__table--name bold">
		        					Неправильное построение предложения с деепричастным оборотом.
		        				</div>

		        				<div className="tasks__table--content">
		        					<p className="tasks__table--text">
		        						Деепричастие обозначает дополнительное действие, которое совершает подлежащее. Деепричастие в предложении можно заменить однородным сказуемым. (Улыбаясь, он шел по улице. – Он шел по улице и улыбался).
		        					</p>

		        					<p className="tasks__table--text">
		        						1) Деепричастный оборот не употребляется, если действие, выраженное сказуемым, и действие, выраженное деепричастием, относятся к разным лицам.
		        					</p>

		        					<p className="tasks__table--text">
		        						<span className="bold red">Неправильно</span>: Подъезжая к городу, начался сильный ветер. (ветер не может подъезжать к городу)
		        					</p>

		        					<p className="tasks__table--text">
		        						<span className="bold green">Правильно</span>: Когда я подъезжал к городу, начался сильный ветер.
		        					</p>

		        					<p className="tasks__table--text">
		        						2) Деепричастный оборот не употребляется в безличном предложении, если в нём сказуемое выражено не инфинитивом.
		        					</p>

		        					<p className="tasks__table--text">
		        						<span className="bold red">Неправильно</span>: Приехав в Москву, мне стало грустно.
		        					</p>

		        					<p className="tasks__table--text">
		        						<span className="bold green">Правильно</span>: Когда я приехал в Москву, мне стало грустно.
		        					</p>

		        					<p className="tasks__table--text">
		        						3) Деепричастный оборот не употребляется, если сказуемое выражено кратким страдательным причастием.
		        					</p>

		        					<p className="tasks__table--text">
		        						<span className="bold red">Неправильно</span>: Сдав экзамены, я был принят в вуз (кем-то принят).
		        					</p>

		        					<p className="tasks__table--text">
		        						<span className="bold green">Правильно</span>: Когда я сдал экзамены, меня приняли в вуз.
		        					</p>
		        				</div>
		        			</div>

		        			<div className="tasks__table--item w100">
		        				<div className="tasks__table--name bold">
		        					Ошибка в построении сложного предложения.
		        				</div>

		        				<div className="tasks__table--content">
		        					<p className="tasks__table--text">
		        						1) Неверное присоединение придаточной части создаёт неоднозначность восприятия смысла предложения. Придаточное определительное должно стоять после того слова, от которого зависит.
		        					</p>

		        					<p className="tasks__table--text">
		        						<span className="bold red">Неправильно</span>: [В письме говорилось], (что в город едет ревизор), (которым управляет Сквозник – Дмухановский) (при таком построении предложения создаётся впечатление, что Сквозник-Дмухановский управляет ревизором, а не городом)
		        					</p>

		        					<p className="tasks__table--text">
		        						<span className="bold green">Правильно</span>: [В письме говорилось], (что в город, (которым управляет Сквозник -Дмухановский), едет ревизор).
		        					</p>

		        					<p className="tasks__table--text">
		        						2) Придаточное изъяснительное присоединяется к главному с помощью частицы ли, выступающей в роли подчинительного союза, поэтому союз что здесь лишний.
		        					</p>

		        					<p className="tasks__table--text">
		        						<span className="bold red">Неправильно</span>: Перед дуэлью Печорин любуется природой, а Вернер спрашивает, (что написал ли он своё завещание).
		        					</p>

		        					<p className="tasks__table--text">
		        						<span className="bold green">Правильно</span>: Перед дуэлью Печорин любуется природой, а Вернер спрашивает, (написал ли он своё завещание).
		        					</p>
		        				</div>
		        			</div>

		        			<div className="tasks__table--item w100">
		        				<div className="tasks__table--name bold">
		        					Нарушение видовременной соотнесенности глагольных форм.
		        				</div>

		        				<div className="tasks__table--content">
		        					<p className="tasks__table--text">
		        						<span className="bold red">Неправильно</span>: Сестра читает книгу и пересказала ее брату.
		        					</p>

		        					<p className="tasks__table--text">
		        						<span className="bold green">Правильно</span>: Сестра прочитала книгу и пересказала ее брату.
		        					</p>
		        				</div>
		        			</div>
		        		</div>
		        	</div>
		        </TabPanel>

		        <TabPanel value="9">
		        	<div className="tasks__item flexstart w100">
		        		<div className="tasks__item--number">
		        			9 задание
		        		</div>

		        		<div className="tasks__item--title w100">
		        			<span className="bold">Формулировка задания: </span> Укажите варианты ответов, в которых во всех словах одного ряда содержится безударная проверяемая гласная корня. Запишите номера ответов.
		        		</div>

		        		<div className="tasks__item--content flexstart w100">
		        			
		        		</div>
		        	</div>
		        </TabPanel>

		        <TabPanel value="10">
		        	<div className="tasks__item flexstart w100">
		        		<div className="tasks__item--number">
		        			10 задание
		        		</div>

		        		<div className="tasks__item--title w100">
		        			<span className="bold">Формулировка задания: </span> Укажите варианты ответов, в которых во всех словах одного ряда пропущена одна и та же буква. Запишите номера ответов.
		        		</div>

		        		<div className="tasks__item--content flexstart w100">
		        			
		        		</div>
		        	</div>
		        </TabPanel>

		        <TabPanel value="11">
		        	<div className="tasks__item flexstart w100">
		        		<div className="tasks__item--number">
		        			11 задание
		        		</div>

		        		<div className="tasks__item--title w100">
		        			<span className="bold">Формулировка задания: </span> Укажите варианты ответов, в которых в обоих словах одного ряда пропущена одна и та же буква. Запишите номера ответов.
		        		</div>

		        		<div className="tasks__item--content flexstart w100">
		        			
		        		</div>
		        	</div>
		        </TabPanel>

		        <TabPanel value="12">
		        	<div className="tasks__item flexstart w100">
		        		<div className="tasks__item--number">
		        			12 задание
		        		</div>

		        		<div className="tasks__item--title w100">
		        			<span className="bold">Формулировка задания: </span> Укажите варианты ответов, в которых во всех словах одного ряда пропущена одна и та же буква. Запишите номера ответов.
		        		</div>

		        		<div className="tasks__item--content flexstart w100">
		        			
		        		</div>
		        	</div>
		        </TabPanel>

		        <TabPanel value="13">
		        	<div className="tasks__item flexstart w100">
		        		<div className="tasks__item--number">
		        			13 задание
		        		</div>

		        		<div className="tasks__item--title w100">
		        			<span className="bold">Формулировка задания: </span> Определите предложение, в котором НЕ со словом пишется СЛИТНО. Раскройте скобки и выпишите это слово.
		        		</div>

		        		<div className="tasks__item--content flexstart w100">
		        			
		        		</div>
		        	</div>
		        </TabPanel>

		        <TabPanel value="14">
		        	<div className="tasks__item flexstart w100">
		        		<div className="tasks__item--number">
		        			14 задание
		        		</div>

		        		<div className="tasks__item--title w100">
		        			<span className="bold">Формулировка задания: </span> Определите предложение, в котором оба выделенных слова пишутся СЛИТНО. Раскройте скобки и выпишите эти два слова.
		        		</div>

		        		<div className="tasks__item--content flexstart w100">
		        			
		        		</div>
		        	</div>
		        </TabPanel>

		        <TabPanel value="15">
		        	<div className="tasks__item flexstart w100">
		        		<div className="tasks__item--number">
		        			15 задание
		        		</div>

		        		<div className="tasks__item--title w100">
		        			<span className="bold">Формулировка задания: </span> Укажите все цифры, на месте которых пишется одна буква Н.
		        		</div>

		        		<div className="tasks__item--content flexstart w100">
		        			
		        		</div>
		        	</div>
		        </TabPanel>

		        <TabPanel value="16">
		        	<div className="tasks__item flexstart w100">
		        		<div className="tasks__item--number">
		        			16 задание
		        		</div>

		        		<div className="tasks__item--title w100">
		        			<span className="bold">Формулировка задания: </span> Расставьте знаки препинания. Укажите номера предложений, в которых нужно поставить ОДНУ запятую.
		        		</div>

		        		<div className="tasks__item--content flexstart w100">
		        			
		        		</div>
		        	</div>
		        </TabPanel>

		        <TabPanel value="17">
		        	<div className="tasks__item flexstart w100">
		        		<div className="tasks__item--number">
		        			17 задание
		        		</div>

		        		<div className="tasks__item--title w100">
		        			<span className="bold">Формулировка задания: </span> Расставьте все знаки препинания: укажите цифру(-ы), на месте которой(-ых) в предложении должна(-ы) стоять запятая(-ые).
		        		</div>

		        		<div className="tasks__item--content flexstart w100">
		        			
		        		</div>
		        	</div>
		        </TabPanel>

		        <TabPanel value="18">
		        	<div className="tasks__item flexstart w100">
		        		<div className="tasks__item--number">
		        			18 задание
		        		</div>

		        		<div className="tasks__item--title w100">
		        			<span className="bold">Формулировка задания: </span> Расставьте все недостающие знаки препинания: укажите цифру(-ы), на месте которой(-ых) в предложении должна(-ы) стоять запятая(-ые).
		        		</div>

		        		<div className="tasks__item--content flexstart w100">
		        			
		        		</div>
		        	</div>
		        </TabPanel>

		        <TabPanel value="19">
		        	<div className="tasks__item flexstart w100">
		        		<div className="tasks__item--number">
		        			19 задание
		        		</div>

		        		<div className="tasks__item--title w100">
		        			<span className="bold">Формулировка задания: </span> Расставьте все знаки препинания: укажите цифру(-ы), на месте которой(-ых) в предложении должна(-ы) стоять запятая(-ые).
		        		</div>

		        		<div className="tasks__item--content flexstart w100">
		        			
		        		</div>
		        	</div>
		        </TabPanel>

		        <TabPanel value="20">
		        	<div className="tasks__item flexstart w100">
		        		<div className="tasks__item--number">
		        			20 задание
		        		</div>

		        		<div className="tasks__item--title w100">
		        			<span className="bold">Формулировка задания: </span> Расставьте все знаки препинания: укажите цифру(-ы), на месте которой(-ых) в предложении должна(-ы) стоять запятая(-ые).
		        		</div>

		        		<div className="tasks__item--content flexstart w100">
		        			
		        		</div>
		        	</div>
		        </TabPanel>

		        <TabPanel value="21">
		        	<div className="tasks__item flexstart w100">
		        		<div className="tasks__item--number">
		        			21 задание
		        		</div>

		        		<div className="tasks__item--title w100">
		        			<span className="bold">Формулировка задания: </span> Найдите предложения, в которых запятая ставится в соответствии с одним и тем же правилом пунктуации. Запишите номера этих предложений.
		        		</div>

		        		<div className="tasks__item--content flexstart w100">
		        			
		        		</div>
		        	</div>
		        </TabPanel>

		        <TabPanel value="22">
		        	<div className="tasks__item flexstart w100">
		        		<div className="tasks__item--number">
		        			22 задание
		        		</div>

		        		<div className="tasks__item--title w100">
		        			<span className="bold">Формулировка задания: </span> Какие из высказываний соответствуют содержанию текста? Укажите номера ответов. Цифры укажите в порядке возрастания.
		        		</div>

		        		<div className="tasks__item--content flexstart w100">
		        			
		        		</div>
		        	</div>
		        </TabPanel>

		        <TabPanel value="23">
		        	<div className="tasks__item flexstart w100">
		        		<div className="tasks__item--number">
		        			23 задание
		        		</div>

		        		<div className="tasks__item--title w100">
		        			<span className="bold">Формулировка задания: </span> Какие из перечисленных утверждений являются верными? Укажите номера ответов.
		        		</div>

		        		<div className="tasks__item--content flexstart w100">
		        			
		        		</div>
		        	</div>
		        </TabPanel>

		        <TabPanel value="24">
		        	<div className="tasks__item flexstart w100">
		        		<div className="tasks__item--number">
		        			24 задание
		        		</div>

		        		<div className="tasks__item--title w100">
		        			<span className="bold">Формулировка задания: </span> Из предложений 26—28 выпишите синонимы (синонимическую пару).
		        		</div>

		        		<div className="tasks__item--content flexstart w100">
		        			
		        		</div>
		        	</div>
		        </TabPanel>

		        <TabPanel value="25">
		        	<div className="tasks__item flexstart w100">
		        		<div className="tasks__item--number">
		        			25 задание
		        		</div>

		        		<div className="tasks__item--title w100">
		        			<span className="bold">Формулировка задания: </span> Среди предложений 6−14 найдите такое(-ие), которое(-ые) связано(-ы) с предыдущим при помощи притяжательного местоимения и контекстных синонимов. Напишите номер(-а) этого(-их) предложения(-ий).
		        		</div>

		        		<div className="tasks__item--content flexstart w100">
		        			
		        		</div>
		        	</div>
		        </TabPanel>

		        <TabPanel value="26">
		        	<div className="tasks__item flexstart w100">
		        		<div className="tasks__item--number">
		        			26 задание
		        		</div>

		        		<div className="tasks__item--title w100">
		        			<span className="bold">Формулировка задания: </span> «Вспоминая о своей бабушке, автор передаёт отношение к ней детей с помощью такого лексического средства, как (А) _______ (в предложении 4). Стремясь воссоздать деятельный характер бабушки, Г. Галлер использует троп — (Б) _______ («как колобок» в предложении 2, «вихрем» в предложении 28), а также синтаксическое средство — (В) _______ (например, в предложениях 2, 9). Ещё один троп — (Г) _______ («оглушительный грохот» в предложении 31, «убогое укрытие» в предложении 39, «хлипкое убежище» в предложении 45) — помогает читателю составить представление об опасностях, которые приходилось преодолевать людям в суровое военное время».
		        		</div>

		        		<div className="tasks__item--content flexstart w100">
		        			
		        		</div>
		        	</div>
		        </TabPanel>

		        <TabPanel value="27">
		        	<div className="tasks__item flexstart w100">
		        		<div className="tasks__item--number">
		        			27 задание
		        		</div>

		        		<div className="tasks__item--title w100">
		        			<span className="bold">Формулировка задания: </span> Напишите сочинение по прочитанному тексту. Сформулируйте одну из проблем, поставленных автором текста. Прокомментируйте сформулированную проблему. Включите в комментарий два примера-иллюстрации из прочитанного текста, которые, по Вашему мнению, важны для понимания проблемы исходного текста (избегайте чрезмерного цитирования). Дайте пояснение к каждому примеру-иллюстрации. Укажите смысловую связь между примерами-иллюстрациями и проанализируйте её.
							Сформулируйте позицию автора (рассказчика). Сформулируйте и обоснуйте своё отношение к позиции автора (рассказчика) по проблеме исходного текста.
							Объём сочинения — не менее 150 слов. Работа, написанная без опоры на прочитанный текст (не по данному тексту), не оценивается. Если сочинение представляет собой пересказанный или полностью переписанный исходный текст без каких бы то ни было комментариев, то такая работа оценивается 0 баллов. Сочинение пишите аккуратно, разборчивым почерком.
		        		</div>

		        		<div className="tasks__item--content flexstart w100">
		        			
		        		</div>
		        	</div>
		        </TabPanel>
		    </TabContext>
		</>
	)
}

export default Russian;