import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import config from './config/config'
import Home from './component/home';
import Aboutwallet from './component/about-wallet';
import Login from './component/login';
import Signup from './component/signup';
import Forgetpassword from './component/forgetpassword';
import PrivacyPolicy from './component/privacypolicy';
import TermsandCondition from './component/termsandcondition';
// import helpcenter from './component/helpcenter';
import Dashboard from './component/dashboard';
import Account from './component/account';
import Buysell from './component/buy-sell';
import Transaction from './component/transaction';
import Profile from './component/profile';
import KycApplication from './component/kyc-application';
import Kycform from './component/kyc-form';
import Deposit from './component/deposit';
import Transfer from './component/transfer';
import VerifyAccount from './component/verifyAccount';
import Resetpassword from './component/resetpassword';
import ProfileActivity from './component/profile-activity';
import Fundtransfer from './component/fundtransfer';
import Withdraw from './component/withdraw';
import Changepassword from './component/changepassword';
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={`${config.baseUrl}`} exact component={Home} />
        <Route path={`${config.baseUrl}Aboutwallet`} exact component={Aboutwallet} />
        <Route path={`${config.baseUrl}Login`} exact component={Login} />
        <Route path={`${config.baseUrl}Signup`} exact component={Signup} />
        <Route path={`${config.baseUrl}Forgetpassword`} exact component={Forgetpassword} />
        <Route path={`${config.baseUrl}PrivacyPolicy`} exact component={PrivacyPolicy} />
        <Route path={`${config.baseUrl}TermsandCondition`} exact component={TermsandCondition} />
        {/* <Route path={`${config.baseUrl}helpcenter`} exact component={helpcenter} /> */}
        <Route path={`${config.baseUrl}Dashboard`} exact component={Dashboard} />
        <Route path={`${config.baseUrl}Account`} exact component={Account} />
        <Route path={`${config.baseUrl}Buysell`} exact component={Buysell} />
        <Route path={`${config.baseUrl}Transaction`} exact component={Transaction} />
        <Route path={`${config.baseUrl}Profile`} exact component={Profile} />
        <Route path={`${config.baseUrl}KycApplication`} exact component={KycApplication} />
        <Route path={`${config.baseUrl}Kycform`} exact component={Kycform} />
        <Route path={`${config.baseUrl}Deposit`} exact component={Deposit} />
        <Route path={`${config.baseUrl}Transfer`} exact component={Transfer} />
        <Route path={`${config.baseUrl}VerifyAccount/:token`} exact component={VerifyAccount} />
        <Route path={`${config.baseUrl}Resetpassword/:token`} exact component={Resetpassword} />
        <Route path={`${config.baseUrl}ProfileActivity`} exact component={ProfileActivity} />
        <Route path={`${config.baseUrl}Fundtransfer/:token`} exact component={Fundtransfer} />
        <Route path={`${config.baseUrl}Withdraw`} exact component={Withdraw} />
        <Route path={`${config.baseUrl}Changepassword`} exact component={Changepassword} />


      </Switch>
    </BrowserRouter>
  );
}

export default App;
