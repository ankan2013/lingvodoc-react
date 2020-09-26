import React from 'react';
import { pure } from 'recompose';
import { Link } from 'react-router-dom';
import { Container, Segment, Header, Card } from 'semantic-ui-react';

const linguistsContributors = [
  {
    header: 'Норманская Юлия Викторовна',
    description: 'главный редактор сайта, ответственный редактор Уральских словарей',
    href: 'http://iling-ran.ru/main/scholars/normanskaya',
  },
  {
    header: 'Дыбо Анна Владимировна',
    description: 'ответственный редактор Алтайских словарей',
    href: 'http://iling-ran.ru/main/scholars/dybo',
  }
];

const developersContributors = [
  {
    header: 'Борисенко Олег Дмитриевич',
    description: 'разработка архитектуры и ядра системы'
  },
  {
    header: 'Тапехин Андрей Николаевич',
    description: 'разработка ядра системы'
  },
  {
    header: 'Богомолов Игорь Владимирович',
    description: 'разработка ядра системы'
  },
  {
    header: 'Белобородов Иван Борисович',
    description: 'вычислительные модули системы'
  },
  {
    header: 'Ипатов Степан Анатольевич',
    description: 'фронтенд'
  },
  {
    header: 'Жаров Андрей Анатольевич',
    description: 'фронтенд'
  }
];

const Info = pure(() =>
  <Container>
    <h3 className="black">Проект выполняется при финансовой поддержке грантов</h3>
    <Segment>
      <ul>
        <li>
          Президента РФ МД -7005.2015.6
          «Создание сравнительно-исторического диалектного аудиословаря уральских языков»,
          2015-2016 (рук. Ю.В. Норманская)
        </li>
        <li>
          РНФ № 15-18-00044
          «Информационная система для описания малочисленных языков народов мира.
            Создание описаний алтайских и уральских языков России, находящихся на грани исчезновения»,
          2015-2017 (рук. В.М. Алпатов)
        </li>
        <li>
          РГНФ № 15-04-00361
          «Первые памятники письменности на уральских и алтайских языках»,
          2015-2017 (рук. Ю.В. Норманская)
        </li>
      </ul>
    </Segment>
    <Segment>
      <p>
        <b>
          Внимание!
          Для доступа ко всем возможностям системы
          (в том числе совместному созданию и редактированию словарей, их публикации,
          привязке метаданных к словарям,
          поиску с учетом геолокаций, загрузки словарей из настольной версии программы)
          необходимо зарегистрироваться и войти в систему.
          Кнопки регистрации/входа в систему находятся в правом верхнем углу страницы.
        </b>
      </p>
      <p>
        <Link to="/desktop">Настольные приложения, связанные с системой, можно скачать в разделе Desktop software</Link>
      </p>
    </Segment>

    <h2 className="black">Участники проекта</h2>
    <Segment>
      <Header color='blue'>Институт языкознания РАН, Томский государственный университет</Header>
      <Card.Group items={linguistsContributors} itemsPerRow={2} />
    </Segment>
    <Segment>
      <Header color='blue'>Институт системного программирования им. В. П. Иванникова РАН</Header>
      <Card.Group items={developersContributors} itemsPerRow={3} />
    </Segment>

    <h2 className="black">Контакты</h2>
    <Segment>
      <p>Вопросы по поводу работы программы LingvoDoc задавайте по адресу <a href="mailto:al@somestuff.ru">al@somestuff.ru</a></p>
    </Segment>
  </Container>
);

export default Info;
