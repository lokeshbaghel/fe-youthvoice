import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import IndexComponentStyled from './IndexComponentStyled';
import IndexComponent from './containers/Login';
import Usercomponent from './containers/user';
import Approvals from './containers/approvals';
import dashboardreportdesktop from './containers/dashboardreportdesktop';
import userreport from './containers/userreport';
import YoungPeople from './containers/youngPeople';
import ForgetPassword from './containers/forgetPassword';
import Profile from './containers/profile';
import Dashboard from './containers/dashboard';
import dashboardSuperHeroReport from './containers/dashboardSuperHeroReport';
import DashboardSuperHeroProfile from './containers/dashboardSuperHeroProfile';
import superHeroSurveyResponse from './containers/superHeroSurveyResponse';
import SuperHeroprofile from './containers/SuperHeroprofile';
import SurveyResponses from './containers/surveyResponses';
import YoungPeopleReport from './containers/youngPeopleReport';
import SurveyInfo from './containers/surveyInfo';
import Survey from './containers/survey';
import SurveyStudyInfoScreen from './containers/surveyStudyInfoScnOne'
import surveyStudyInfoScreenTwo from './containers/surveyStudyInfoScnTwo'
import surveyStudyInfoScreenThree from './containers/surveyStudyInfoScnThree'
import surveyModuleCompleteScn from './containers/surveyModuleCompleteScn'
import surveyNoteScn from './containers/surveyNoteScn'


function App() {
  return (
    <React.Fragment>
      <IndexComponentStyled>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={IndexComponent} />
          <Route exact path="/login" component={IndexComponent} />
          <Route exact path="/user" component={Usercomponent} />
          <Route exact path="/approvals" component={Approvals} />
          <Route exact path="/forgetpassword" component={ForgetPassword} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/userreport" component={userreport} />
          <Route exact path="/youngpeople" component={YoungPeople} />
          <Route exact path="/dashboardsuperheroprofile" component={DashboardSuperHeroProfile} />
          <Route exact path="/dashboardsuperheroprofilereport" component={dashboardSuperHeroReport} />
          <Route exact path="/superherosurveyresponse" component={superHeroSurveyResponse} />
          <Route exact path="/superheroprofile" component={SuperHeroprofile} />
          
          <Route exact path="/survey-response/:id/:type/:userid" component={SurveyResponses} />
          <Route exact path="/survey/info/:id/:questionnaireId/:questionaireUserRespondentId/:type" component={SurveyInfo} />
          <Route exact path="/survey/info/screen/:id/:questionnaireId/:questionaireUserRespondentId/:type" component={SurveyStudyInfoScreen} />
          <Route exact path="/survey/info/option/:id/:questionnaireId/:questionaireUserRespondentId/:type" component={surveyStudyInfoScreenTwo} />
          <Route exact path="/survey/info/click/:id/:questionnaireId/:questionaireUserRespondentId/:type" component={surveyStudyInfoScreenThree} />
          <Route exact path="/survey/module/:id/:questionnaireId/:questionaireUserRespondentId/:type" component={surveyModuleCompleteScn} />
          <Route exact path="/survey/:id/:questionnaireId/:questionaireUserRespondentId/:type/:module_id" component={Survey} />
          <Route exact path="/young-people-report/:id" component={YoungPeopleReport} />
      
          <Route exact path="/young-people-spiral-report/:id/:userid/:type" component={dashboardreportdesktop} />
          <Route exact path="/survey/hideFrom/:userId/:questionnareUserRespondentId" component={surveyNoteScn} />
        </Switch>
      </BrowserRouter>
      </IndexComponentStyled>
    </React.Fragment>
  );
}

export default App;
