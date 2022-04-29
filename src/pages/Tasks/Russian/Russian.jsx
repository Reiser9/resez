import React from 'react';
import {makeStyles} from '@mui/styles';

import {useStyles} from '../../../theme/gstyle.js';

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const useLocalStyles = makeStyles(theme => ({
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
		width: '220px',
		borderRight: `1px solid ${theme.palette.primary.main}`,
		'@media (max-width: 768px)': {
		    borderRight: 'none',
		    borderBottom: `1px solid ${theme.palette.primary.main}`,
		    width: '100%'
		}
	},
	tasksTableItemFull: {
		padding: '1.5rem',
		border: `1px solid ${theme.palette.primary.main}`,
		borderTop: 'none',
		'&:first-child': {
			borderTop: `1px solid ${theme.palette.primary.main}`
		},
		'@media (max-width: 768px)': {
		    padding: '.75rem'
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
		<TabContext value={tab}>
	        <TabList sx={{minHeight: 'auto'}} classes={{flexContainer: gstyle.tabContainer, root: gstyle.tabContext}}
	        TabIndicatorProps={{style: {display: "none"}}} onChange={handleChange}>
	        	<Tab label="1" value="1" className={gstyle.link} />
	            <Tab label="2" value="2" className={gstyle.link} />
	            <Tab label="3" value="3" className={gstyle.link} />
	            <Tab label="4" value="4" className={gstyle.link} />
	            <Tab label="5" value="5" className={gstyle.link} />
	            <Tab label="6" value="6" className={gstyle.link} />
	            <Tab label="7" value="7" className={gstyle.link} />
	            <Tab label="8" value="8" className={gstyle.link} />
	            <Tab label="9" value="9" className={gstyle.link} />
	            <Tab label="10" value="10" className={gstyle.link} />
	            <Tab label="11" value="11" className={gstyle.link} />
	            <Tab label="12" value="12" className={gstyle.link} />
	            <Tab label="13" value="13" className={gstyle.link} />
	            <Tab label="14" value="14" className={gstyle.link} />
	            <Tab label="15" value="15" className={gstyle.link} />
	            <Tab label="16" value="16" className={gstyle.link} />
	            <Tab label="17" value="17" className={gstyle.link} />
	            <Tab label="18" value="18" className={gstyle.link} />
	            <Tab label="19" value="19" className={gstyle.link} />
	            <Tab label="20" value="20" className={gstyle.link} />
	            <Tab label="21" value="21" className={gstyle.link} />
	            <Tab label="22" value="22" className={gstyle.link} />
	            <Tab label="23" value="23" className={gstyle.link} />
	            <Tab label="24" value="24" className={gstyle.link} />
	            <Tab label="25" value="25" className={gstyle.link} />
	            <Tab label="26" value="26" className={gstyle.link} />
	            <Tab label="27" value="27" className={gstyle.link} />
	        </TabList>

	        <TabPanel value="1">
	        	<Box className={`${gstyle.w100} ${gstyle.flexstart} ${gstyle.taskItem}`}>
	        		<Typography variant="p" component="p" color="white.main" className={gstyle.tasksItemNumber}>
	        			1 задание
	        		</Typography>

	        		<Typography component="h5" variant="h6" className={gstyle.title}>
	        			<Typography component="span" variant="h6" sx={{fontWeight: 700}}>Формулировка задания: </Typography> Укажите варианты ответов, в которых даны верные характеристики фрагмента текста. Запишите номера этих ответов.
	        		</Typography>

	        		<Box className={`${gstyle.flexstart} ${gstyle.w100} ${gstyle.taskBox}`}>
	        			<Typography variant="p" component="p" className={gstyle.text}>
	        				1) Проанализировать текст не читая варианты ответов(если читать после текста варианты ответов, можно запутаться)
	        			</Typography>

	        			<Typography variant="p" component="p" className={gstyle.text}>
	        				2) Самому сжать текст, что бы осталась только главная суть
	        			</Typography>

	        			<Typography variant="p" component="p" className={gstyle.text}>
	        				3) Сравнить свой текст с вариантами ответов
	        			</Typography>
	        		</Box>
	        	</Box>
	        </TabPanel>

	        <TabPanel value="2">
	        	<Box className={`${gstyle.w100} ${gstyle.flexstart} ${gstyle.taskItem}`}>
	        		<Typography variant="p" component="p" color="white.main" className={gstyle.tasksItemNumber}>
	        			2 задание
	        		</Typography>

	        		<Typography component="h5" variant="h6" className={gstyle.title}>
	        			<Typography component="span" variant="h6" sx={{fontWeight: 700}}>Формулировка задания: </Typography> Самостоятельно подберите (какую-то часть речи), которая должна стоять на месте пропуска в n-ом предложении текста. Запишите это местоимение.
	        		</Typography>

	        		<Box className={`${gstyle.flexstart} ${gstyle.w100} ${gstyle.taskBox}`}>
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
	        	<Box className={`${gstyle.w100} ${gstyle.flexstart} ${gstyle.taskItem}`}>
	        		<Typography variant="p" component="p" color="white.main" className={gstyle.tasksItemNumber}>
	        			3 задание
	        		</Typography>

	        		<Typography component="h5" variant="h6" className={gstyle.title}>
	        			<Typography component="span" variant="h6" sx={{fontWeight: 700}}>Формулировка задания: </Typography> Прочитайте фрагмент словарной статьи, в которой приводятся значения слова, выделенного 
	        			в n-ом предложении текста. Определите значение, в котором это слово употреблено в тексте. Выпишите цифру, соответствующую этому значению 
	        			в приведённом фрагменте словарной статьи.
	        		</Typography>

	        		<Box className={`${gstyle.flexstart} ${gstyle.w100} ${gstyle.taskBox}`}>
	        			<Typography variant="p" component="p" className={gstyle.text}>
	        				1) Внимательно прочитать текст и понять для себя, в каком смысле употреблено слово
	        			</Typography>

	        			<Typography variant="p" component="p" className={gstyle.text}>
	        				2) Обратить внимание на примеры к каждому пункту вариантов ответов, чаще всего курсивом отмечен верный вариант ответов, либо же идентичный пример, как и в тексте
	        			</Typography>
	        		</Box>
	        	</Box>
	        </TabPanel>

	        <TabPanel value="4">
	        	<Box className={`${gstyle.w100} ${gstyle.flexstart} ${gstyle.taskItem}`}>
	        		<Typography variant="p" component="p" color="white.main" className={gstyle.tasksItemNumber}>
	        			4 задание
	        		</Typography>

	        		<Typography component="h5" variant="h6" className={gstyle.title}>
	        			<Typography component="span" variant="h6" sx={{fontWeight: 700}}>Формулировка задания: </Typography> В каком слове допущена ошибка в постановке ударения: 
	        			НЕВЕРНО выделена буква, обозначающая ударный гласный звук? Выпишите это слово.
	        		</Typography>

	        		<Box className={`${gstyle.flexstart} ${gstyle.w100} ${gstyle.taskBox}`}>
	        			<Typography variant="p" component="p" className={gstyle.text}>
	        				<Typography component="span" variant="p" sx={{fontWeight: 700}}>Существительные: </Typography> агЕнт, агронОмия, агЕнтство, агОния, адАптер, адюльтЕр, айвА, акрОполь, алкогОль, алфавИт, Амфора, анАпест, анАлог, анАтом, аннЕксия, антитЕза, 
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
	        			</Typography>

	        			<Typography variant="p" component="p" className={gstyle.text}>
	        				<Typography component="span" variant="p" sx={{fontWeight: 700}}>Глаголы на -ировать: </Typography> баллотИровать, блокИровать, дозИровать, забронИровать (забронировАть)-зависит от значения, информИровать и т.д, опломбировАть, премировАть, формировАть, 
	        				бомбардировАть, гравировАть, гримировАть, нормировАть, сортировАть, пломбировАть, ретировАться, экипировАть
	        			</Typography>

	        			<Typography variant="p" component="p" className={gstyle.text}>
	        				<Typography component="span" variant="p" sx={{fontWeight: 700}}>Глаголы на -ить: </Typography> благоволИть, варИть( вАрит, вАришь, вАрят, варЯщий), включИть (включИт, включАт), вручИть (вручИт), вложИть, всполошИть, дозвонИться( звонИть, позвонИть, 
	        				звонИт и т.д), жИться-жилОсь, запорошИть, исключИть-исключИт, наделИть-наделИт, накренИться – накренИтся, насорИть-насорИт, облегчИть-облегчИт, ободрИть, обострИть, одолжИть-одолжИт, окружИть-окружИт, 
	        				оперИться, плодоносИть-плодонОсит-плодоносИл, повторИть-повторИт и т.д., положИть-положИл, сверлИть-сверлИт-сверлИшь, сорИть-сорИт, убыстрИть, углубИть, укрепИть-укрепИт, щемИть-щемИт, опОшлить-опОшлит, 
	        				озлОбить, оклЕить, освЕдомить-освЕдомишь, откУпорить - закУпорить(закУпорка и т.д.) откУпоривать, отвОрит, принУдить, тЕплиться, улУчшить, оцЕнит, предвосхИтить
	        			</Typography>

	        			<Typography variant="p" component="p" className={gstyle.text}>
	        				<Typography component="span" variant="p" sx={{fontWeight: 700}}>Глаголы на -ла: </Typography> бралА бралАсь, взялА взялАсь, влИться(влилАсь), ворвАться (ворвалАсь), вопринЯть( воспринялА), воссоздАть (воссоздалА), гнАть-гналА, гнАться-гналАсь, 
	        				добрАть –добралА, добрАться-добралАсь, дождАться-дождалАсь, лгАть-лгалА, лить-лилАсь, надорвАться – надорвалАсь, назвАться-назвалАсь, налИть-налилА, нарвАть-нарвалА, облИться-облилАсь, обнЯться – обнялАсь, 
	        				обогнАть-обогналА, ободрАть-ободралА, отбЫть-отбылА, отдАть-отдалА, отозвАть-отозвалА-отозвалАсь, перелИть-перелилА, позвАть-позвалА, создАть-создалА, сорвАть-сорвалА, убрАть-убралА, клАла, послАла, постлАла, 
	        				слАла крАлась прислАла укрАла, баловАть
	        			</Typography>

	        			<Typography variant="p" component="p" className={gstyle.text}>
	        				<Typography component="span" variant="p" sx={{fontWeight: 700}}>Другие глаголы: </Typography> чЕрпать -исчЕрпать, занЯть –зАнял, занялА, зАняло, зАняли, понЯть-понялА-понЯвший-понЯв, принЯть — прИнял — принялА — прИняло — прИняли; принЯвший; прИнятый; 
	        				прИнят — принятА — прИнято — прИняты; принЯв, задАть—зАдал—задалА—зАдало—зАдали; задАвший; зАданный; зАдан—заданА—зАдано—зАданы; задАв, допИть—дОпил—допилА—дОпило—дОпили; допИвший; дОпитый; дОпит—допитА—дОпито—дОпиты;
	        				допИв, начАть—нАчал—началА—нАчало—нАчали; начАвший; нАчатый; нАчат—начатА—нАчато—нАчаты; начАв, нажИть—нАжил—нажилА—нАжило—нАжили; нажИвший; нАжитый; нАжит—нажитА—нАжито—нАжиты; нажИв, прибЫть—прИбыл—прибылА—прИбыло—прИбыли;
	        				прибЫвший; прибЫв, вЫлила, заперЕться- заперлАсь, заржАвЕть, началсЯ, нажИлся, багровЕть, плЕсневеть, ржАвЕть, заИндЕветь, ходАтайствовать, щЁлкать, ЮркнУть, упомянУть, разминУться, стрельнУ, премИнуть, кАшлянуть
	        			</Typography>

	        			<Typography variant="p" component="p" className={gstyle.text}>
	        				<Typography component="span" variant="p" sx={{fontWeight: 700}}>Прилагательные: </Typography> аудитОрный, балОванный, безУдЕржный, бредОвый-бредовОй, валовОй, вернА, волгодОнский, вОгнутый, гладкошЁрстный, грУшевый, давнИшний, дЕвичий (устар. девИчий, договОрный, 
	        				зАнятый (чем-то), занятОй (человек), зубчАтый, избалОванный, кедрОвый, кожЕвенный, красИвее-красИвейший, кровоточАщий, кУхонный, ловкА, лососЁвый, лубОчный, мИзЕрный, мозаИчный, никчЁмный, неприхотлИвый, одноимЁнный,
	        				оптОвый, пломбИруют, повАренная соль, полУденный, призывнОй(пункт, возраст), призЫвный (зовущий), прожОрлива, прозорлИва-прозорлИвый, равнО, смазлИва, суетлИва, соплемЕнный, слИвовый, Угольный, угОльный, украИнский,
	        				флЕйтовый, характЕрный(типичный), харАктерный (актер), хОленый хОленный (но холЁный), шАхтинский, щегольскОй, юрОдивый, языковОй( язык-речь), языкОвый (орган), яИчный
	        			</Typography>

	        			<Typography variant="p" component="p" className={gstyle.text}>
	        				<Typography component="span" variant="p" sx={{fontWeight: 700}}>Наречия: </Typography> вОвремя, втрИдорога, добелА, доголА, дочернА, докраснА, дОверху, дОнизу, дОсиня, дОсуха, донагА, донЕльзя, зАсветло, зАтемно, завИдно, задОлго, издавна, изредка, исстари, исподволь,
	        				исконИ, мастерскИ, мЕльком, нАбело (допуст. набелО), надОлго, нАголо (допуст. наголО), ненадОлго, наОтмашь, неподалЁку, отчАсти
	        			</Typography>

	        			<Typography variant="p" component="p" className={gstyle.text}>
	        				<Typography component="span" variant="p" sx={{fontWeight: 700}}>Причастия: </Typography> включЁнный, заключЁнный, исключЁнный, отключЁнный, взбешЁнный, углублЁнный, укреплЁнный, вручЁнный, приручЁнный, облегчЁнный, ободрЁнный, обострЁнный, убыстрЁнный, повторЁнный,
	        				наделЁнный, поделЁнный, приручЁнный, привнесЁнный, определЁнный, окружЁнный, возбуждЁнный, награждЁнный, накренЁнный, новорождЁнный, заселЁнный, оценЁнный, отворЁнный, одОлженный. улУчшенный, кОлотый, пОлотый, сОгнутый,
	        				пОгнутый, изОгнутый, зАгнутый, завЁрнутый, Обнятый, пОнятый, понятОй, пОднятый, упомЯнутый, прОткнутый, предпрИнятый, нагнУтый, нАчатый, зАпертый запертА, знАчимый, обнЯвший, свЕдущий, варЯщийся, манЯщий, молЯщий, кровоточАщий,
	        				кормЯщий, могУщий (от глагола мочь), инсценИрованный, экипирОванный, понЯвший, умЕрший
	        			</Typography>

	        			<Typography variant="p" component="p" className={gstyle.text}>
	        				<Typography component="span" variant="p" sx={{fontWeight: 700}}>Деепричастия: </Typography> балУясь, закУпорив, начАв, начАвшись, отдАв, поднЯв, понЯв, прибЫв
	        			</Typography>

	        			<Typography variant="p" component="p" className={gstyle.text}>
	        				<Typography component="span" variant="p" sx={{fontWeight: 700}}>"Ударяемые" предлоги (ударение на предлог при произношении): </Typography> нА воду, на ногу, на гору, на руку, на зиму, на год, на нос, на день, на ночь; под: пОд ноги, под руки, под гору, под вечер; по: пО морю, по полю, по лесу, по полу, по носу, по два, по три,
	        				по сто, по двое, по трое; из: Из лесу, из дому, из носу, из виду; без: бЕз вести, без толку, без году неделя
	        			</Typography>
	        		</Box>
	        	</Box>
	        </TabPanel>

	        <TabPanel value="5">
	        	<Box className={`${gstyle.w100} ${gstyle.flexstart} ${gstyle.taskItem}`}>
	        		<Typography variant="p" component="p" color="white.main" className={gstyle.tasksItemNumber}>
	        			5 задание
	        		</Typography>

	        		<Typography component="h5" variant="h6" className={gstyle.title}>
	        			<Typography component="span" variant="h6" sx={{fontWeight: 700}}>Формулировка задания: </Typography> В одном из приведённых ниже предложений НЕВЕРНО употреблено выделенное слово. 
	        			Исправьте лексическую ошибку, подобрав к выделенному слову пароним. Запишите подобранное слово.
	        		</Typography>

	        		<Box className={`${gstyle.flexstart} ${gstyle.w100} ${gstyle.taskBox}`}>
	        			<Box className={`${localStyle.tasksTableItemFull} ${gstyle.w100}`}>
	        				<Typography variant="p" component="p" className={gstyle.text}>
	        					<Typography component="span" variant="p" sx={{fontWeight: 700}}>Абонемент </Typography> - право пользования чем-либо (или документ, предоставляющий это право) на определённый срок: абонемент в бассейн.
	        				</Typography>

	        				<Typography variant="p" component="p" className={gstyle.text}>
	        					<Typography component="span" variant="p" sx={{fontWeight: 700}}>Абонент </Typography> - лицо или учреждение, имеющее абонемент: абонент телефонной сети.
	        				</Typography>
	        			</Box>

	        			<Box className={`${localStyle.tasksTableItemFull} ${gstyle.w100}`}>
	        				<Typography variant="p" component="p" className={gstyle.text}>
	        					<Typography component="span" variant="p" sx={{fontWeight: 700}}>Адресат </Typography> – лицо или организация, кому адресовано почтовое отправление (получатель).
	        				</Typography>

	        				<Typography variant="p" component="p" className={gstyle.text}>
	        					<Typography component="span" variant="p" sx={{fontWeight: 700}}>Адресант </Typography> – лицо или организация, посылающие почтовое отправление (отправитель).
	        				</Typography>
	        			</Box>
	        		</Box>
	        	</Box>
	        </TabPanel>

	        <TabPanel value="6">
	        	<Box className={`${gstyle.w100} ${gstyle.flexstart} ${gstyle.taskItem}`}>
	        		<Typography variant="p" component="p" color="white.main" className={gstyle.tasksItemNumber}>
	        			6 задание
	        		</Typography>

	        		<Typography component="h5" variant="h6" className={gstyle.title}>
	        			<Typography component="span" variant="h6" sx={{fontWeight: 700}}>Формулировка задания: </Typography> Отредактируйте предложение: исправьте лексическую ошибку, заменив неверно употреблённое слово. Запишите подобранное слово, соблюдая нормы современного русского литературного языка.
	        		</Typography>

	        		<Box className={`${gstyle.flexstart} ${gstyle.w100} ${gstyle.taskBox}`}>
	        			<Typography variant="p" component="p" className={gstyle.text}>
	        				Правил особых нет, поэтому нужно нарешивать и наблюдать эти случаи
	        			</Typography>

	        			<Typography variant="p" component="p" className={gstyle.text}>
	        				<Typography component="span" variant="p" sx={{fontWeight: 700}}>Исключите лишнее слово: </Typography> внимательно наблюдаем за каждыми рядом стоящими словами
	        			</Typography>

	        			<Typography variant="p" component="p" className={gstyle.text}>
	        				<Typography component="span" variant="p" sx={{fontWeight: 700}}>Замените лишнее слово: </Typography> ищем слово, которое не подходит по значению (архаизм, деалект)
	        			</Typography>
	        		</Box>
	        	</Box>
	        </TabPanel>

	        <TabPanel value="7">
	        	<Box className={`${gstyle.w100} ${gstyle.flexstart} ${gstyle.taskItem}`}>
	        		<Typography variant="p" component="p" color="white.main" className={gstyle.tasksItemNumber}>
	        			7 задание
	        		</Typography>

	        		<Typography component="h5" variant="h6" className={gstyle.title}>
	        			<Typography component="span" variant="h6" sx={{fontWeight: 700}}>Формулировка задания: </Typography> В одном из выделенных ниже слов допущена ошибка в образовании формы слова. Исправьте ошибку и запишите слово правильно.
	        		</Typography>

	        		<Box className={`${gstyle.flexstart} ${gstyle.w100} ${gstyle.taskBox}`}>
	        			<Box className={`${gstyle.w100} ${localStyle.tasksTableItem}`}>
	        				<Typography variant="p" component="p" className={localStyle.tasksTableName} sx={{fontWeight: 700}}>
	        					Слова на -тор, -сор,-вор, -ер
	        				</Typography>

	        				<Box className={`${localStyle.tasksTableContent}`}>
	        					<Typography component="p" variant="p" className={gstyle.text}>
	        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Ы, И: </Typography> инструкторы, редакторылекторы, ректоры, конструкторы, прожекторы, секторы, инженеры, шофёры, бухгалтеры, диспетчеры, договоры, приговоры, плейеры, драйверы, принтеры
	        					</Typography>

	        					<Typography component="p" variant="p" className={gstyle.text}>
	        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>А, Я: </Typography> директора, профессора, инспектора, доктора, катера, ордера, тенора, фельдшера, флюгера, хутора, шулера, буфера, веера, буера, повара
	        					</Typography>
	        				</Box>
	        			</Box>

	        			<Box className={`${gstyle.w100} ${localStyle.tasksTableItem}`}>
	        				<Typography variant="p" component="p" className={localStyle.tasksTableName} sx={{fontWeight: 700}}>
	        					Слова на -ля
	        				</Typography>

	        				<Box className={`${localStyle.tasksTableContent}`}>
	        					<Typography component="p" variant="p" className={gstyle.text}>
	        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>И: </Typography> грифели, госпитали
	        					</Typography>

	        					<Typography component="p" variant="p" className={gstyle.text}>
	        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>А, Я: </Typography> векселя, вензеля, кителя, штабеля, штемпеля, тополя, шомпола, колокола, купола
	        					</Typography>
	        				</Box>
	        			</Box>

	        			<Box className={`${gstyle.w100} ${localStyle.tasksTableItem}`}>
	        				<Typography variant="p" component="p" className={localStyle.tasksTableName} sx={{fontWeight: 700}}>
	        					Остальные слова
	        				</Typography>

	        				<Box className={`${localStyle.tasksTableContent}`}>
	        					<Typography component="p" variant="p" className={gstyle.text}>
	        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>И: </Typography> слесари, токари, конюхи, возрасты, кремы, супы, грунты, лифты, порты, склады, торты, флоты, фронты, штабы, штурманы
	        					</Typography>

	        					<Typography component="p" variant="p" className={gstyle.text}>
	        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>А, Я: </Typography> адреса, бока, борта, века, жемчуга, жернова, края, желоба, кузова, окорока, округа, острова, отпуска, паруса, паспорта, погреба, потроха, снега, стога, сорта, сторожа, тетерева, черепа
	        					</Typography>
	        				</Box>
	        			</Box>
	        		</Box>
	        	</Box>
	        </TabPanel>

	        <TabPanel value="8">
	        	<Box className={`${gstyle.w100} ${gstyle.flexstart} ${gstyle.taskItem}`}>
	        		<Typography variant="p" component="p" color="white.main" className={gstyle.tasksItemNumber}>
	        			8 задание
	        		</Typography>

	        		<Typography component="h5" variant="h6" className={gstyle.title}>
	        			<Typography component="span" variant="h6" sx={{fontWeight: 700}}>Формулировка задания: </Typography> Установите соответствие между грамматическими ошибками и предложениями, в которых они допущены: к каждой позиции первого столбца подберите соответствующую позицию из второго столбца.
	        		</Typography>

	        		<Box className={`${gstyle.flexstart} ${gstyle.w100} ${gstyle.taskBox}`}>
	        			<Box className={`${gstyle.w100} ${localStyle.tasksTableItem}`}>
	        				<Typography variant="p" component="p" className={localStyle.tasksTableName} sx={{fontWeight: 700}}>
	        					Неправильное употребление падежной формы существительного с предлогом
	        				</Typography>

	        				<Box className={`${localStyle.tasksTableContent}`}>
	        					<Typography component="p" variant="p">
	        						После 6 предлогов: благодаря, согласно, вопреки, подобно, наперекор, наперерез; Слово должно стоять в <Typography component="span" variant="p" sx={{fontWeight: 700}}>дательном падеже </Typography>
	        					</Typography>

	        					<Typography component="p" variant="p">
	        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Например: </Typography> согласно правилу, подобно учению, благодаря людям
	        					</Typography>

	        					<Typography component="p" variant="p">
	        						Предлог "по" в значении "после чего-либо" употребляется с именем существительным только в форме <Typography component="span" variant="p" sx={{fontWeight: 700}}>предложного падежа </Typography>, а не дательного
	        					</Typography>

	        					<Typography component="p" variant="p">
	        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Например: </Typography> по прибытии, по приезде, по завершении, по окончании, по истечении, по прилете
	        					</Typography>

	        					<Typography component="p" variant="p">
	        						После предлога "вследствии", существительное употребляется в <Typography component="span" variant="p" sx={{fontWeight: 700}}>родительном падеже</Typography>
	        					</Typography>

	        					<Typography component="p" variant="p">
	        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Например: </Typography> вследствие сильных дождей
	        					</Typography>
	        				</Box>
	        			</Box>

	        			<Box className={`${gstyle.w100} ${localStyle.tasksTableItem}`}>
	        				<Typography variant="p" component="p" className={localStyle.tasksTableName} sx={{fontWeight: 700}}>
	        					Нарушение в построении предложения с несогласованным приложением
	        				</Typography>

	        				<Box className={`${localStyle.tasksTableContent}`}>
	        					<Typography component="p" variant="p">
	        						Чаще всего эта ошибка встречается в названии чего либо, к примеру книги, произведения, озера и т.д
	        					</Typography>

	        					<Typography component="p" variant="p">
	        						Если перед названием чего либо есть определяющее слово, к примеру: в
	        						<Typography component="span" variant="p" sx={{fontWeight: 700}}> картине </Typography> "спящий пастушок", тут есть определяющее слово: "Картина", значит название будет в <Typography component="span" variant="p" sx={{fontWeight: 700}}>именительном падеже </Typography>
	        					</Typography>

	        					<Typography component="p" variant="p">
	        						Если же нет определяющего слова, например: в "спящем пастушке", тогда название склоняется взависимости от предлога перед ним
	        					</Typography>
	        				</Box>
	        			</Box>

	        			<Box className={`${gstyle.w100} ${localStyle.tasksTableItem}`}>
	        				<Typography variant="p" component="p" className={localStyle.tasksTableName} sx={{fontWeight: 700}}>
	        					Нарушение связи между подлежащим и сказуемым
	        				</Typography>

	        				<Box className={`${localStyle.tasksTableContent}`}>
	        					<Typography component="p" variant="p">
	        						1) Знать расшифровки аббревиатур, к примеру ООН - Организация Объеденённых Наций, женский род, следовательно будет: "ООН объявила", а не объявил или объявило
	        					</Typography>

	        					<Typography component="p" variant="p">
	        						2) Следующее нужно запомнить. Если у Вас будет похожее предложение: "
	        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>ВСЕ, КТО </Typography> интересуется театром, <Typography component="span" variant="p" sx={{fontWeight: 700}}>ЗНАЮТ </Typography> имя Алексея Бахрушина", Либо вместо ВСЕ КТО будет ТЕ КТО и др., то нужно знать, во внутренней части предложения, "Кто интересуется театром", должно быть в единственном числе, а после внутренней части "Все ... Знают", должно быть в множественном числе
	        					</Typography>
	        				</Box>
	        			</Box>

	        			<Box className={`${gstyle.w100} ${localStyle.tasksTableItem}`}>
	        				<Typography variant="p" component="p" className={localStyle.tasksTableName} sx={{fontWeight: 700}}>
	        					Неправильное построение предложения с косвенной речью
	        				</Typography>

	        				<Box className={`${localStyle.tasksTableContent}`}>
	        					<Typography component="p" variant="p">
	        						При переводе прямой речи в косвенную местоимения и глаголы в форме 1 лица следует заменить местоимениями и глаголами 3 лица.
	        					</Typography>

	        					<Typography component="p" variant="p">
	        						<Typography component="span" variant="p" color="red.main" sx={{fontWeight: 700}}>Неправильно: </Typography> "Автор утверждает, что я это знаю, а не просто предполагаю." (смешение прямой и косвенной речи)
	        					</Typography>

	        					<Typography component="p" variant="p">
	        						<Typography component="span" variant="p" color="green.main" sx={{fontWeight: 700}}>Правильно: </Typography> "Автор утверждает, что он это знает, а не просто предполагает."
	        					</Typography>
	        				</Box>
	        			</Box>

	        			<Box className={`${gstyle.w100} ${localStyle.tasksTableItem}`}>
	        				<Typography variant="p" component="p" className={localStyle.tasksTableName} sx={{fontWeight: 700}}>
	        					Ошибка в построении предложения с однородными членами
	        				</Typography>

	        				<Box className={`${localStyle.tasksTableContent}`}>
	        					<Typography component="p" variant="p">
	        						1) Каждый из однородных членов должен быть грамматически соотнесён с общим словом.
	        					</Typography>

	        					<Typography component="p" variant="p">
	        						2) Каждый из однородных членов должен быть лексически соотнесён с общим словом.
	        					</Typography>

	        					<Typography component="p" variant="p">
	        						3) Если однородные члены - прилагательные или причастия, они должны быть оба в одной форме (полной или краткой).
	        					</Typography>

	        					<Typography component="p" variant="p">
	        						4) Если перед однородными членами предполагаются разные предлоги, то их нельзя опускать.
	        					</Typography>

	        					<Typography component="p" variant="p">
	        						5) Все однородные члены должны стоять в том же падеже, что и обобщающее слово.
	        					</Typography>

	        					<Typography component="p" variant="p">
	        						6) Нельзя смешивать родо-видовые понятия в ряду однородных членов.
	        					</Typography>

	        					<Typography component="p" variant="p">
	        						7) Нарушен порядок слов при использовании двойных союзов (Как…, так и…; не только…, но и…; если не…, то…; не столько…, сколько…; не то чтобы…, а….), повторяющихся союзов (то... то; не то... не то и др.). Части таких союзов должны стоять непосредственно рядом с однородными членами!
	        					</Typography>

	        					<Typography component="p" variant="p">
	        						8) Части двойного союза постоянны, их нельзя заменять другими словами: не только … но и, если не…, то, как…, так и
	        					</Typography>
	        				</Box>
	        			</Box>

	        			<Box className={`${gstyle.w100} ${localStyle.tasksTableItem}`}>
	        				<Typography variant="p" component="p" className={localStyle.tasksTableName} sx={{fontWeight: 700}}>
	        					Нарушение в построении предложения с причастным оборотом
	        				</Typography>

	        				<Box className={`${localStyle.tasksTableContent}`}>
	        					<Typography component="p" variant="p">
	        						1) Причастие с определяемым словом должно быть согласовано в роде, числе и падеже.
	        					</Typography>

	        					<Typography component="p" variant="p">
	        						<Typography component="span" variant="p" color="red.main" sx={{fontWeight: 700}}>Неправильно: </Typography> Мы гордимся нашими футболистами (Т.П.), победивших (Р.П.) английскую команду
	        					</Typography>

	        					<Typography component="p" variant="p">
	        						<Typography component="span" variant="p" color="green.main" sx={{fontWeight: 700}}>Правильно: </Typography> Мы гордимся нашими футболистами (Т.П.), победившими (Р.П.) английскую команду
	        					</Typography>

	        					<Typography component="p" variant="p">
	        						2) Определяемое слово не должно входить в причастный оборот.
	        					</Typography>

	        					<Typography component="p" variant="p">
	        						<Typography component="span" variant="p" color="red.main" sx={{fontWeight: 700}}>Неправильно: </Typography> Приготовленные оладьи мамой были необыкновенно вкусны.
	        					</Typography>

	        					<Typography component="p" variant="p">
	        						<Typography component="span" variant="p" color="green.main" sx={{fontWeight: 700}}>Правильно: </Typography> Оладьи, приготовленные мамой, были необыкновенно вкусны.
	        					</Typography>

	        					<Typography component="p" variant="p">
	        						3) Не должно быть замены действительного причастия на страдательное.
	        					</Typography>

	        					<Typography component="p" variant="p">
	        						<Typography component="span" variant="p" color="red.main" sx={{fontWeight: 700}}>Неправильно: </Typography> Задание, выполняющееся нами, не вызывает особых затруднений.
	        					</Typography>

	        					<Typography component="p" variant="p">
	        						<Typography component="span" variant="p" color="green.main" sx={{fontWeight: 700}}>Правильно: </Typography> Задание, выполняемое нами, не вызывает особых затруднений.
	        					</Typography>
	        				</Box>
	        			</Box>

	        			<Box className={`${gstyle.w100} ${localStyle.tasksTableItem}`}>
	        				<Typography variant="p" component="p" className={localStyle.tasksTableName} sx={{fontWeight: 700}}>
	        					Неправильное построение предложения с деепричастным оборотом.
	        				</Typography>

	        				<Box className={`${localStyle.tasksTableContent}`}>
	        					<Typography component="p" variant="p">
	        						Деепричастие обозначает дополнительное действие, которое совершает подлежащее. Деепричастие в предложении можно заменить однородным сказуемым. (Улыбаясь, он шел по улице. – Он шел по улице и улыбался).
	        					</Typography>

	        					<Typography component="p" variant="p">
	        						1) Деепричастный оборот не употребляется, если действие, выраженное сказуемым, и действие, выраженное деепричастием, относятся к разным лицам.
	        					</Typography>

	        					<Typography component="p" variant="p">
	        						<Typography component="span" variant="p" color="red.main" sx={{fontWeight: 700}}>Неправильно: </Typography> Подъезжая к городу, начался сильный ветер. (ветер не может подъезжать к городу)
	        					</Typography>

	        					<Typography component="p" variant="p">
	        						<Typography component="span" variant="p" color="green.main" sx={{fontWeight: 700}}>Правильно: </Typography> Когда я подъезжал к городу, начался сильный ветер.
	        					</Typography>

	        					<Typography component="p" variant="p">
	        						2) Деепричастный оборот не употребляется в безличном предложении, если в нём сказуемое выражено не инфинитивом.
	        					</Typography>

	        					<Typography component="p" variant="p">
	        						<Typography component="span" variant="p" color="red.main" sx={{fontWeight: 700}}>Неправильно: </Typography> Приехав в Москву, мне стало грустно.
	        					</Typography>

	        					<Typography component="p" variant="p">
	        						<Typography component="span" variant="p" color="green.main" sx={{fontWeight: 700}}>Правильно: </Typography> Когда я приехал в Москву, мне стало грустно.
	        					</Typography>

	        					<Typography component="p" variant="p">
	        						3) Деепричастный оборот не употребляется, если сказуемое выражено кратким страдательным причастием.
	        					</Typography>

	        					<Typography component="p" variant="p">
	        						<Typography component="span" variant="p" color="red.main" sx={{fontWeight: 700}}>Неправильно: </Typography> Сдав экзамены, я был принят в вуз (кем-то принят).
	        					</Typography>

	        					<Typography component="p" variant="p">
	        						<Typography component="span" variant="p" color="green.main" sx={{fontWeight: 700}}>Правильно: </Typography> Когда я сдал экзамены, меня приняли в вуз.
	        					</Typography>
	        				</Box>
	        			</Box>

	        			<Box className={`${gstyle.w100} ${localStyle.tasksTableItem}`}>
	        				<Typography variant="p" component="p" className={localStyle.tasksTableName} sx={{fontWeight: 700}}>
	        					Ошибка в построении сложного предложения.
	        				</Typography>

	        				<Box className={`${localStyle.tasksTableContent}`}>
	        					<Typography component="p" variant="p">
	        						1) Неверное присоединение придаточной части создаёт неоднозначность восприятия смысла предложения. Придаточное определительное должно стоять после того слова, от которого зависит.
	        					</Typography>

	        					<Typography component="p" variant="p">
	        						<Typography component="span" variant="p" color="red.main" sx={{fontWeight: 700}}>Неправильно: </Typography> [В письме говорилось], (что в город едет ревизор), (которым управляет Сквозник – Дмухановский) (при таком построении предложения создаётся впечатление, что Сквозник-Дмухановский управляет ревизором, а не городом)
	        					</Typography>

	        					<Typography component="p" variant="p">
	        						<Typography component="span" variant="p" color="green.main" sx={{fontWeight: 700}}>Правильно: </Typography> [В письме говорилось], (что в город, (которым управляет Сквозник -Дмухановский), едет ревизор).
	        					</Typography>

	        					<Typography component="p" variant="p">
	        						2) Придаточное изъяснительное присоединяется к главному с помощью частицы ли, выступающей в роли подчинительного союза, поэтому союз что здесь лишний.
	        					</Typography>

	        					<Typography component="p" variant="p">
	        						<Typography component="span" variant="p" color="red.main" sx={{fontWeight: 700}}>Неправильно: </Typography> Перед дуэлью Печорин любуется природой, а Вернер спрашивает, (что написал ли он своё завещание).
	        					</Typography>

	        					<Typography component="p" variant="p">
	        						<Typography component="span" variant="p" color="green.main" sx={{fontWeight: 700}}>Правильно: </Typography> Перед дуэлью Печорин любуется природой, а Вернер спрашивает, (написал ли он своё завещание).
	        					</Typography>
	        				</Box>
	        			</Box>

	        			<Box className={`${gstyle.w100} ${localStyle.tasksTableItem}`}>
	        				<Typography variant="p" component="p" className={localStyle.tasksTableName} sx={{fontWeight: 700}}>
	        					Нарушение видовременной соотнесенности глагольных форм.
	        				</Typography>

	        				<Box className={`${localStyle.tasksTableContent}`}>
	        					<Typography component="p" variant="p">
	        						<Typography component="span" variant="p" color="red.main" sx={{fontWeight: 700}}>Неправильно: </Typography> Сестра читает книгу и пересказала ее брату.
	        					</Typography>

	        					<Typography component="p" variant="p">
	        						<Typography component="span" variant="p" color="green.main" sx={{fontWeight: 700}}>Правильно: </Typography> Сестра прочитала книгу и пересказала ее брату.
	        					</Typography>
	        				</Box>
	        			</Box>
	        		</Box>
	        	</Box>
	        </TabPanel>

	        <TabPanel value="9">
	        	<Box className={`${gstyle.w100} ${gstyle.flexstart} ${gstyle.taskItem}`}>
	        		<Typography variant="p" component="p" color="white.main" className={gstyle.tasksItemNumber}>
	        			9 задание
	        		</Typography>

	        		<Typography component="h5" variant="h6" className={gstyle.title}>
	        			<Typography component="span" variant="h6" sx={{fontWeight: 700}}>Формулировка задания: </Typography> Укажите варианты ответов, в которых во всех словах одного ряда содержится безударная чередующаяся/непроверяемая гласная корня. Запишите номера ответов
	        		</Typography>

	        		<Typography variant="p" component="p" className={gstyle.title}>
	        			Гласные в корне можно разделить на три группы: <Typography component="span" variant="p" sx={{fontWeight: 700}}>проверяемые, непроверяемые и чередующиеся</Typography>
	        		</Typography>

	        		<Typography variant="p" component="p" className={gstyle.text}>
	        			В русском языке существует много похожих либо омонимичных (совпадающих) корней. Важно понимать, наблюдается в корне конкретного слова чередование гласной или нет
	        		</Typography>

	        		<Typography variant="p" component="p" className={gstyle.text}>
	        			Ваша основная задача – определить, к какой группе следует отнести гласную в корне того или иного слова. Важно не путать чередующиеся гласные с проверяемыми и непроверяемыми
	        		</Typography>

	        		<Box className={`${gstyle.flexstart} ${gstyle.w100} ${gstyle.taskBox}`}>
	        			<Box className={`${localStyle.tasksTableItemFull} ${gstyle.w100}`}>
	        				<Typography variant="p" component="p" sx={{fontWeight: 700}} className={gstyle.title}>
	        					Правописание гласных в корне в случае чередования Е/И
	        				</Typography>

	        				<Typography variant="p" component="p" className={gstyle.text}>
	        					<Typography component="span" variant="p" sx={{fontWeight: 700}}>Распространяется для таких пар корней как:</Typography> бер/бир, пер/пир, дер/дир, тер/тир, мер/мир, жег/жиг, блест/блист, стел/стил, чет/чит
	        				</Typography>

	        				<Typography variant="p" component="p" className={gstyle.text}>
	        					<Typography component="span" variant="p" sx={{fontWeight: 700}}>Примеры:</Typography> заберу – забирАю, блестеть на солнце – блистАть на балу
	        				</Typography>

	        				<Typography variant="p" component="p" className={gstyle.text}>
	        					<Typography component="span" variant="p" sx={{fontWeight: 700}}>Исключения:</Typography> чЕта (т.е. пара), сочЕтать, сочЕтание, словосочЕтание, бракосочЕтание. В этих словах гласная "А" после корня есть, но в корне следует писать букву "Е"
	        				</Typography>

	        				<Typography variant="p" component="p" sx={{fontWeight: 700}} className={gstyle.title}>
	        					Значения корней с чередованием Е/И
	        				</Typography>

	        				<Typography variant="p" component="p" sx={{fontWeight: 700}} className={gstyle.text}>
	        					Есть за корнем суффикс "А" - значит в корне "И" всегда
	        				</Typography>
	        			</Box>

	        			<Box className={`${gstyle.w100} ${localStyle.tasksTableItem}`}>
	        				<Typography variant="p" component="p" className={localStyle.tasksTableName} sx={{fontWeight: 700}}>
	        					Бер/Бир
	        				</Typography>

	        				<Box className={`${localStyle.tasksTableContent}`}>
	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Значения корней с чередованием:</Typography> брать, забирать, убирать, выбирать, пробираться и т.п.
	        					</Typography>

	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Не подходят следующие слова:</Typography> берег, бережок; беречь, бережно, сбережения, сберегать, сберегательный. В них нет чередования. Гласные проверяемые
	        					</Typography>

	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						В слове бирюзовый гласная непроверяемая
	        					</Typography>
	        				</Box>
	        			</Box>

	        			<Box className={`${gstyle.w100} ${localStyle.tasksTableItem}`}>
	        				<Typography variant="p" component="p" className={localStyle.tasksTableName} sx={{fontWeight: 700}}>
	        					Пер/Пир
	        				</Typography>

	        				<Box className={`${localStyle.tasksTableContent}`}>
	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Значения корней с чередованием:</Typography> запирать, выпирать, опираться, препирательства и т.п.
	        					</Typography>

	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Не подходят следующие слова:</Typography> пир, пировать, перо, перочинный. В них гласные не чередующиеся, а проверяемые
	        					</Typography>

	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						В словах спираль, перила, эксперимент, темперамент, период, периодический гласные проверить нельзя
	        					</Typography>
	        				</Box>
	        			</Box>

	        			<Box className={`${gstyle.w100} ${localStyle.tasksTableItem}`}>
	        				<Typography variant="p" component="p" className={localStyle.tasksTableName} sx={{fontWeight: 700}}>
	        					Дер/Дир
	        				</Typography>

	        				<Box className={`${localStyle.tasksTableContent}`}>
	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Значения корней с чередованием:</Typography> выдирать (вырывать), удирать
	        					</Typography>

	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Не подходят следующие слова:</Typography> держать, задержать(ся), содержать, содержимое, деревья, деревянный. Гласные не чередующиеся, а проверяемые (держит, содержит, дерево)
	        					</Typography>

	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						В словах директор, директива, гардероб, дирижёр, дирижировать тоже нет чередования. Гласные непроверяемые
	        					</Typography>
	        				</Box>
	        			</Box>

	        			<Box className={`${gstyle.w100} ${localStyle.tasksTableItem}`}>
	        				<Typography variant="p" component="p" className={localStyle.tasksTableName} sx={{fontWeight: 700}}>
	        					Тер/Тир
	        				</Typography>

	        				<Box className={`${localStyle.tasksTableContent}`}>
	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Значения корней с чередованием:</Typography> вытирать
	        					</Typography>

	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Не подходят следующие слова:</Typography> терять, терпение, терпеть, стирать, стирка. Гласные в них не являются чередующимися. Их можно проверить
	        					</Typography>

	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						В словах тиран, тирания, теребить гласные непроверяемые.
	        					</Typography>
	        				</Box>
	        			</Box>

	        			<Box className={`${gstyle.w100} ${localStyle.tasksTableItem}`}>
	        				<Typography variant="p" component="p" className={localStyle.tasksTableName} sx={{fontWeight: 700}}>
	        					Мер/Мир
	        				</Typography>

	        				<Box className={`${localStyle.tasksTableContent}`}>
	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Значения корней с чередованием:</Typography> замирать, умирать
	        					</Typography>

	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Не подходят следующие слова:</Typography> мир, мирный, перемирие, примириться, усмирить, смириться, смирение, непримиримый, умиротворение (в этих словах гласные проверяемые; мир = спокойствие); мировой, мировоззрение, мироощущение (в этих словах гласные тоже можно проверить словом мир; мир = Земля); мерить (одежду), мерять, примерочная; измерять (температуру), измерение, замерять
	        					</Typography>

	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						Слово меридиан тоже не содержит чередования. Оно словарное (гласная непроверяемая)
	        					</Typography>
	        				</Box>
	        			</Box>

	        			<Box className={`${gstyle.w100} ${localStyle.tasksTableItem}`}>
	        				<Typography variant="p" component="p" className={localStyle.tasksTableName} sx={{fontWeight: 700}}>
	        					Жег/Жиг
	        				</Typography>

	        				<Box className={`${localStyle.tasksTableContent}`}>
	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Значения корней с чередованием:</Typography> жечь, зажигать, выжигать, зажигалка и т.п. (речь идёт об огне, горении).
	        					</Typography>
	        				</Box>
	        			</Box>

	        			<Box className={`${gstyle.w100} ${localStyle.tasksTableItem}`}>
	        				<Typography variant="p" component="p" className={localStyle.tasksTableName} sx={{fontWeight: 700}}>
	        					Блест/Блист
	        				</Typography>

	        				<Box className={`${localStyle.tasksTableContent}`}>
	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Значения корней с чередованием:</Typography> блестеть, блистать
	        					</Typography>
	        				</Box>
	        			</Box>

	        			<Box className={`${gstyle.w100} ${localStyle.tasksTableItem}`}>
	        				<Typography variant="p" component="p" className={localStyle.tasksTableName} sx={{fontWeight: 700}}>
	        					Стел/Стил
	        				</Typography>

	        				<Box className={`${localStyle.tasksTableContent}`}>
	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Значения корней с чередованием:</Typography> стелить
	        					</Typography>

	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Не подходят следующие слова:</Typography> стилистический, стилистика, стилизация, стилизовать чередования нет. Гласные проверяются ударением (стиль)
	        					</Typography>

	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						В слове стеллаж гласная непроверяемая
	        					</Typography>
	        				</Box>
	        			</Box>

	        			<Box className={`${gstyle.w100} ${localStyle.tasksTableItem}`}>
	        				<Typography variant="p" component="p" className={localStyle.tasksTableName} sx={{fontWeight: 700}}>
	        					Чет/Чит
	        				</Typography>

	        				<Box className={`${localStyle.tasksTableContent}`}>
	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Значения корней с чередованием:</Typography> вычитать, почитать (=уважать), почитатель (таланта), сочетать, сочетание и т.п.
	        					</Typography>

	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Не подходят следующие слова:</Typography> читать, прочитать и т.д. (слова, связанные с чтением), гласные в них не чередующиеся, а проверяемые (прочитывать)
	        					</Typography>
	        				</Box>
	        			</Box>
	        		</Box>

	        		<Typography variant="p" component="p" className={gstyle.text}>
	        			Можно заметить, что самыми простыми для запоминания и узнавания корнями из указанных выше являются жег/жиг, блест/блист. Эти корни с чередующимися гласными практически невозможно спутать с проверяемыми и непроверяемыми гласными. Обращайте внимание на эти корни. Они могут облегчить для Вас выполнение задания, стать подсказками. Следует также понимать, что чередование гласных Е/И в корнях глаголов обычно соответствует разным видам глаголов – совершенному и несовершенному. Пример: вытирать (несовершенный вид) – вытереть (совершенный вид)
	        		</Typography>

	        		<Box className={`${gstyle.flexstart} ${gstyle.w100} ${gstyle.taskBox}`}>
	        			<Box className={`${localStyle.tasksTableItemFull} ${gstyle.w100}`}>
	        				<Typography variant="p" component="p" sx={{fontWeight: 700}} className={gstyle.title}>
	        					Значения корней с чередованием О/А
	        				</Typography>

	        				<Typography variant="p" component="p" sx={{fontWeight: 700}} className={gstyle.text}>
	        					Есть за корнем суффикс "А" - значит в корне "А" всегда
	        				</Typography>
	        			</Box>

	        			<Box className={`${gstyle.w100} ${localStyle.tasksTableItem}`}>
	        				<Typography variant="p" component="p" className={localStyle.tasksTableName} sx={{fontWeight: 700}}>
	        					Кас/Кос
	        				</Typography>

	        				<Box className={`${localStyle.tasksTableContent}`}>
	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Примеры:</Typography> прикоснусь – прикасаюсь, прикосновение, касательная.
	        					</Typography>
	        					
	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Значения корней с чередованием:</Typography> дотрагиваться (прямой смысл), затрагивать в разговоре (переносный смысл)
	        					</Typography>

	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Не подходят следующие слова:</Typography> косичка, коса, косить (траву) не имеют чередующихся гласных в корне! Гласные проверяются ударением
	        					</Typography>

	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						А в словах закоснелые (взгляды, общество), касатка, костюм, костюмер, косить (о глазах), косой, косолапый, покоситься, искоса гласные нельзя проверить. Это словарные слова
	        					</Typography>
	        				</Box>
	        			</Box>

	        			<Box className={`${gstyle.w100} ${localStyle.tasksTableItem}`}>
	        				<Typography variant="p" component="p" className={localStyle.tasksTableName} sx={{fontWeight: 700}}>
	        					Лаг/Лож
	        				</Typography>

	        				<Box className={`${localStyle.tasksTableContent}`}>
	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Примеры:</Typography> приложу – прилагаю, прилагательное, приложение, изложение
	        					</Typography>

	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Исключение:</Typography> пОлог
	        					</Typography>
	        					
	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Значения корней с чередованием:</Typography> класть, прилагать, излагать и т.п.
	        					</Typography>

	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Не подходят следующие слова:</Typography> ложь, ложка, логичный, аналогичный - чередования нет!
	        					</Typography>
	        				</Box>
	        			</Box>
	        		</Box>

	        		<Box className={`${gstyle.flexstart} ${gstyle.w100} ${gstyle.taskBox}`}>
	        			<Box className={`${localStyle.tasksTableItemFull} ${gstyle.w100}`}>
	        				<Typography variant="p" component="p" sx={{fontWeight: 700}} className={gstyle.text}>
	        					Есть за корнем суффикс "А" - значит в корне "ИМ" всегда
	        				</Typography>
	        			</Box>

	        			<Box className={`${gstyle.w100} ${localStyle.tasksTableItem}`}>
	        				<Typography variant="p" component="p" className={localStyle.tasksTableName} sx={{fontWeight: 700}}>
	        					Им/А(Я)
	        				</Typography>

	        				<Box className={`${localStyle.tasksTableContent}`}>
	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Примеры:</Typography> принимать – принять, отнимать – отнять, снимать – снять, сжимать - сжать
	        					</Typography>

	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						Это пары глаголов несовершенного и совершенного вида.
	        					</Typography>
	        				</Box>
	        			</Box>
	        		</Box>

	        		<Box className={`${gstyle.flexstart} ${gstyle.w100} ${gstyle.taskBox}`}>
	        			<Box className={`${localStyle.tasksTableItemFull} ${gstyle.w100}`}>
	        				<Typography variant="p" component="p" sx={{fontWeight: 700}} className={gstyle.text}>
	        					Есть за корнем суффикс "А" - значит в корне "ИН" всегда
	        				</Typography>
	        			</Box>

	        			<Box className={`${gstyle.w100} ${localStyle.tasksTableItem}`}>
	        				<Typography variant="p" component="p" className={localStyle.tasksTableName} sx={{fontWeight: 700}}>
	        					Ин/А(Я)
	        				</Typography>

	        				<Box className={`${localStyle.tasksTableContent}`}>
	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Примеры:</Typography> начинать – начать, приминать – примять, проклинать – проклясть.
	        					</Typography>

	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						Это пары глаголов несовершенного и совершенного вида.
	        					</Typography>
	        				</Box>
	        			</Box>
	        		</Box>

	        		<Box className={`${gstyle.flexstart} ${gstyle.w100} ${gstyle.taskBox}`}>
	        			<Box className={`${localStyle.tasksTableItemFull} ${gstyle.w100}`}>
	        				<Typography variant="p" component="p" sx={{fontWeight: 700}} className={gstyle.text}>
	        					Перед "СТ", "Щ" пиши "А". Перед "С" пиши "О"
	        				</Typography>
	        			</Box>

	        			<Box className={`${gstyle.w100} ${localStyle.tasksTableItem}`}>
	        				<Typography variant="p" component="p" className={localStyle.tasksTableName} sx={{fontWeight: 700}}>
	        					Раст(Ращ)/Рос
	        				</Typography>

	        				<Box className={`${localStyle.tasksTableContent}`}>
	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Примеры:</Typography> вырастать, выращивать, вырос, водоросли
	        					</Typography>

	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						Перед "Щ" всегда "А", а вот для "СТ", "С" есть <Typography component="span" variant="p" sx={{fontWeight: 700}}>исключения:</Typography>
	        					</Typography>

	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						Росток, росточек, ростковый и т.п. (т.е. все слова, образованные от слова «росток»); Ростов, ростовский и т.п. (т.е. все слова, образованные от слова «Ростов»); ростовщик, ростовщичество и т.п. (т.е. все слова, образованные от слова «ростовщик»); Ростислав
	        						на вырост; рост; подросток; отрасль, отраслевой, межотраслевой и т.п. (т.е. все слова, образованные от слова «отрасль»)
	        					</Typography>

	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						В слове роскошный чередования нет. Гласную можно проверить (роскошь).
	        					</Typography>
	        				</Box>
	        			</Box>
	        		</Box>

	        		<Box className={`${gstyle.flexstart} ${gstyle.w100} ${gstyle.taskBox}`}>
	        			<Box className={`${localStyle.tasksTableItemFull} ${gstyle.w100}`}>
	        				<Typography variant="p" component="p" sx={{fontWeight: 700}} className={gstyle.text}>
	        					Перед "К" в безударном положении пиши "А"(СКАК), Перед "Ч" в безударном положении пиши "О"(СКОЧ), Под ударением пиши то, что слышишь(могут быть корни -скак-, -скок-, -скоч-, -скач-)
	        				</Typography>
	        			</Box>

	        			<Box className={`${gstyle.w100} ${localStyle.tasksTableItem}`}>
	        				<Typography variant="p" component="p" className={localStyle.tasksTableName} sx={{fontWeight: 700}}>
	        					Скак/Скоч
	        				</Typography>

	        				<Box className={`${localStyle.tasksTableContent}`}>
	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Примеры:</Typography> скакать (перед "К" в безударном положении пиши "А"); выскочка (перед "Ч" в безударном положении пиши "О"); скачки (под ударением пиши то, что слышишь)
	        					</Typography>

	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Исключения:</Typography> скачок, скачу, скачи, скачите, скачкообразный
	        					</Typography>

	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						Росток, росточек, ростковый и т.п. (т.е. все слова, образованные от слова «росток»); Ростов, ростовский и т.п. (т.е. все слова, образованные от слова «Ростов»); ростовщик, ростовщичество и т.п. (т.е. все слова, образованные от слова «ростовщик»); Ростислав
	        						на вырост; рост; подросток; отрасль, отраслевой, межотраслевой и т.п. (т.е. все слова, образованные от слова «отрасль»)
	        					</Typography>

	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						В слове роскошный чередования нет. Гласную можно проверить (роскошь).
	        					</Typography>
	        				</Box>
	        			</Box>
	        		</Box>

	        		<Box className={`${gstyle.flexstart} ${gstyle.w100} ${gstyle.taskBox}`}>
	        			<Box className={`${localStyle.tasksTableItemFull} ${gstyle.w100}`}>
	        				<Typography variant="p" component="p" sx={{fontWeight: 700}} className={gstyle.text}>
	        					Под ударением пиши "А" (помни слово "загАр"), Без ударения пиши "О"
	        				</Typography>
	        			</Box>

	        			<Box className={`${gstyle.w100} ${localStyle.tasksTableItem}`}>
	        				<Typography variant="p" component="p" className={localStyle.tasksTableName} sx={{fontWeight: 700}}>
	        					Гар/Гор
	        				</Typography>

	        				<Box className={`${localStyle.tasksTableContent}`}>
	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Примеры:</Typography> загар, загорелый, загорать, загореть, пригореть
	        					</Typography>

	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Исключения:</Typography> вЫгарки (остатки от сгорания), Изгарь (отходы при плавке руды), прИгарь (привкус гари в подгоревшей пище)
	        					</Typography>

	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Значения корней с чередованием:</Typography> гореть, загореть
	        					</Typography>

	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Нет чередования в следующих словах:</Typography> алгоритм, горизонт, горизонтальный, горячий, гора, гористый, горный, город, городской, горе, горевать, огорчение, огорчить, пригорюниться, гордость, горделивый, гордиться, горький, горечь, горчица, горчичник
	        					</Typography>
	        				</Box>
	        			</Box>
	        		</Box>

	        		<Box className={`${gstyle.flexstart} ${gstyle.w100} ${gstyle.taskBox}`}>
	        			<Box className={`${localStyle.tasksTableItemFull} ${gstyle.w100}`}>
	        				<Typography variant="p" component="p" sx={{fontWeight: 700}} className={gstyle.text}>
	        					Под ударением пиши то, что слышишь, Без ударения пиши "О"
	        				</Typography>
	        			</Box>

	        			<Box className={`${gstyle.w100} ${localStyle.tasksTableItem}`}>
	        				<Typography variant="p" component="p" className={localStyle.tasksTableName} sx={{fontWeight: 700}}>
	        					Твар/Твор
	        				</Typography>

	        				<Box className={`${localStyle.tasksTableContent}`}>
	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Примеры:</Typography> творить, творец, творение, сотворение, стихотворение, творчество; притворить, притвориться, вытворять, благотворительность, творительный
	        					</Typography>

	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Исключения:</Typography> утварь (без ударения в этом слове буква а)
	        					</Typography>

	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Нет чередования в следующих словах:</Typography> творог, творожок
	        					</Typography>
	        				</Box>
	        			</Box>

	        			<Box className={`${gstyle.w100} ${localStyle.tasksTableItem}`}>
	        				<Typography variant="p" component="p" className={localStyle.tasksTableName} sx={{fontWeight: 700}}>
	        					Клан/Клон
	        				</Typography>

	        				<Box className={`${localStyle.tasksTableContent}`}>
	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Примеры:</Typography> кланяться, поклон (под ударением пишем то, что слышим); склонение, наклонение, преклонение (без ударения пишем О)
	        					</Typography>

	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Нет чередования в следующих словах:</Typography> клонировать, склон
	        					</Typography>
	        				</Box>
	        			</Box>
	        		</Box>

	        		<Box className={`${gstyle.flexstart} ${gstyle.w100} ${gstyle.taskBox}`}>
	        			<Box className={`${localStyle.tasksTableItemFull} ${gstyle.w100}`}>
	        				<Typography variant="p" component="p" sx={{fontWeight: 700}} className={gstyle.text}>
	        					Под ударением пиши то, что слышишь, Без ударения пиши "А"
	        				</Typography>
	        			</Box>

	        			<Box className={`${gstyle.w100} ${localStyle.tasksTableItem}`}>
	        				<Typography variant="p" component="p" className={localStyle.tasksTableName} sx={{fontWeight: 700}}>
	        					Зар/Зор
	        				</Typography>

	        				<Box className={`${localStyle.tasksTableContent}`}>
	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Примеры:</Typography> зорька, зарево (под ударением пишем то, что слышим); заря, озарять, зарница, зарянка (без ударения пишем "А"")
	        					</Typography>

	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Исключения:</Typography> утварь (без ударения в этом слове буква а)
	        					</Typography>

	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Нет чередования в следующих словах:</Typography> прозорливый, взор, узор, позор, надзор, подзорная (труба), озорной, озорничать
	        					</Typography>
	        				</Box>
	        			</Box>
	        		</Box>

	        		<Box className={`${gstyle.flexstart} ${gstyle.w100} ${gstyle.taskBox}`}>
	        			<Box className={`${gstyle.w100} ${localStyle.tasksTableItem}`}>
	        				<Typography variant="p" component="p" className={localStyle.tasksTableName} sx={{fontWeight: 700}}>
	        					Мак/Мок(Моч)
	        				</Typography>

	        				<Box className={`${localStyle.tasksTableContent}`}>
	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						Слова с корнем – мак - имеют значение «погружать в жидкость». Пример – обмакнуть перо в чернила
	        					</Typography>

	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						Слова промокнуть (что-либо чем-либо), промокашка, промокательная бумага имеют значение «погружать в жидкость», но пишутся через "О"(-мок-). Это исключения
	        					</Typography>

	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						Слова с корнями -мок-, -моч- имеют значения «становиться влажным», «пропускать или не пропускать жидкость»
	        					</Typography>

	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Примеры:</Typography> вымокнуть под дождём, непромокаемая обувь, промочить ноги, мокрица
	        					</Typography>

	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Нет чередования в следующих словах:</Typography> макет, макулатура, макароны, мак, маковый, мочалка, замок, замочный
	        					</Typography>
	        				</Box>
	        			</Box>

	        			<Box className={`${gstyle.w100} ${localStyle.tasksTableItem}`}>
	        				<Typography variant="p" component="p" className={localStyle.tasksTableName} sx={{fontWeight: 700}}>
	        					Равн/Ровн
	        				</Typography>

	        				<Box className={`${localStyle.tasksTableContent}`}>
	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						Слова с корнем -равн- имеют значение «равный, одинаковый»
	        					</Typography>

	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Примеры:</Typography> наравне, уравнение, уравнять в правах, равнозначный, равновесие, сравнить
	        					</Typography>

	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						Слова с корнем -ровн- имеют значение «ровный, гладкий»
	        					</Typography>

	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Примеры:</Typography> подровнять волосы, выровнять края, разровнять грядку, заровнять яму
	        					</Typography>

	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Исключения:</Typography> равнина, равнение, уровень, поровну, ровесник
	        					</Typography>
	        				</Box>
	        			</Box>

	        			<Box className={`${gstyle.w100} ${localStyle.tasksTableItem}`}>
	        				<Typography variant="p" component="p" className={localStyle.tasksTableName} sx={{fontWeight: 700}}>
	        					Плов/Плыв/Плав
	        				</Typography>

	        				<Box className={`${localStyle.tasksTableContent}`}>
	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						Корень -плов- пишется только в словах пловец, пловчиха
	        					</Typography>

	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						Корень -плыв- - в словах плывуны (слои почвы), плыть, заплыв и т.п
	        					</Typography>

	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						Корень -плав- - в остальных словах. Примеры – плавать, поплавок, жук-плавунец, плавник, плавучий, сплавляться
	        					</Typography>

	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Примеры:</Typography> подровнять волосы, выровнять края, разровнять грядку, заровнять яму
	        					</Typography>

	        					<Typography variant="p" component="p" className={gstyle.text}>
	        						<Typography component="span" variant="p" sx={{fontWeight: 700}}>Исключения:</Typography> равнина, равнение, уровень, поровну, ровесник
	        					</Typography>
	        				</Box>
	        			</Box>
	        		</Box>

	        		<Box className={`${gstyle.flexstart} ${gstyle.w100} ${gstyle.taskBox}`}>
		        		<Box className={`${gstyle.w100} ${localStyle.tasksTableItem}`}>
		        			<Typography variant="p" component="p" className={localStyle.tasksTableName} sx={{fontWeight: 700}}>
		        				Словарные слова с непроверяемыми гласными в корне
		        			</Typography>

		        			<Box className={`${localStyle.tasksTableContent}`}>
		        				<Typography component="p" variant="p">
		        					Резиденция, апартаменты, каморка, ватрушка, винегрет, линолеум, конфорка, поролон, палисадник, багаж, иждивенец, антагонизм, бойкот, регламент, компетентный, суверенитет, декларация, директива, привелегия, приоритет, адвокат, апелляция, компромисс, реставрировать, экспонат, карнавал, аплодисменты, филармония, оригинальный, семинар, сертификат, эксперимент, теория, стипендия, вакансия, ветеринар, интеллигентный, досконально, дезертир, дилетант, корифей, меценат, пессимист, коварный, примитивный, предварительный, привередливый, экстремальный, сиреневый, игнорировать, колдовать, мотивировать, компоновать, стремиться, утрамбовывать, авангард, альманах, элемент, дефицит, горизонт, панорама, меридиан, парадокс, каламбур, аннотация, реабилитация, катастрофа, кавычки, гарнизон, комбинезон, авантюра, аномалия, наваждение, ностальгия, габариты
		        				</Typography>
		        			</Box>
		        		</Box>
		        	</Box>
	        	</Box>
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
	)
}

export default Russian;