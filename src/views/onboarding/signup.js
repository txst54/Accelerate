import React from "react";
import { getDatabase, ref, set, onValue } from "firebase/database";
import {getAuth} from "firebase/auth";

import {
    StylizedAgreement,
    StylizedDescriptor,
    StylizedInput,
    StylizedSection,
    StylizedSubmit
} from "../../components/formelements";

// the role is for cosmetics only, real role is handled by backend
// too lazy to figure out a script to combine authentication role and
// database without running an inefficient check-all-users script
// Future Goal: get rid of cosmetic role stored in database
const DEFAULT_STATE = {
    firstname: "",
    lastname: "",
    prefemail: "",
    instructor: "",
    roblox: "",
    agree: false,
    disabled: false,
    email: "",
    last_completed_module: -1,
    role: "pending"
};


/**
 * Profile Component for https://texascapitalcollective.org/profile
 * @param props.debug DebugHandler object for logging and handling urls
 * @param props.active whether the user is activated or not
 */
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = DEFAULT_STATE;
    }

    componentDidMount = () => {
        const db = getDatabase();
        const parent = this;
        const path = "users/" + this.props.user.email.replace(/\./g, ",");
        onValue(ref(db, path), (snapshot) => {
            const newState = snapshot.val();
            // if form has been edited, all items will be non-editable
            if (newState !== DEFAULT_STATE && newState !== null) {
                newState.disabled = true;
            }
            parent.setState(newState);
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.disabled) {
            this.setState( {disabled: false} )
        }
        else {
            this.setState({disabled: true}, () => {
                // register user data
                this.setUserData()
            });
        }
    }

    setUserData = () => {
        console.log("Setting data...");
        const db = getDatabase();
        // replace '.' in emails with ',' because firebase can't store '.' as a char
        const path = "users/" + this.props.user.email.replace(/\./g, ",");
        const newUser = this.state;
        newUser.email = this.props.user.email
        set(ref(db, path), newUser)
            .then(() => {
                console.log("Successfully set user data!");
                this.forceUpdate();
                window.location.reload();
            });
    }

    handleChanges = (e) => {
        // console.log(e.target.value, e.target.checked, e.target.type);
        if (e.target.type === "radio" || e.target.type === "checkbox") {
            this.setState({ [e.target.id]: e.target.checked });
        } else {
            this.setState({ [e.target.id]: e.target.value });
        }
    }

    render() {
        // empty 3 col-span block to organize inputs on the grid more aesthetically
        const block = <div className="col-span-6 sm:col-span-3"></div>;
        return(
            <form onSubmit={this.handleSubmit}>
                <div className="py-4 px-48">
                    <StylizedSection>
                        <div className="md:col-span-3 flex-col flex items-center  border-b-gray-100 pb-4 border-b-2">
                            <div className="text-4xl pb-2 font-semibold">Student Registration</div>
                            <div className="text-gray-500">This information helps us build the best experience for you. </div>
                        </div>
                        <StylizedDescriptor title="Personal Information"
                                            description="Please use a personal email account that you can receive
                                mail at."/>
                        <div className="mt-5 md:mt-0 md:col-span-2">
                            <div className="grid grid-cols-6 gap-6">
                                <StylizedInput id="firstname" label="First Name" disabled={this.state.disabled}
                                               value={this.state.firstname} onChange={this.handleChanges}/>
                                <StylizedInput id="lastname" label="Last Name" disabled={this.state.disabled}
                                               value={this.state.lastname} onChange={this.handleChanges}/>
                                <StylizedInput id="prefemail" label="Email Address" disabled={this.state.disabled}
                                               value={this.state.prefemail} onChange={this.handleChanges}
                                               smwidth={4}/>
                            </div>
                        </div>
                    </StylizedSection>
                    <StylizedSection>
                        <StylizedDescriptor title="Course Logistics"
                                            description="Please enter the key your instructor has provided. "/>
                        <div className="mt-5 md:mt-0 md:col-span-2">
                            <div className="grid grid-cols-6 gap-6">
                                <StylizedInput id="instructor" label="Instructor Key" disabled={this.state.disabled}
                                               value={this.state.instructor} onChange={this.handleChanges}
                                               smwidth={4}/>
                                {block}
                                <StylizedInput id="roblox" label="Roblox Username" disabled={this.state.disabled}
                                               value={this.state.roblox} onChange={this.handleChanges}
                                               smwidth={4}/>
                                {block}
                            </div>
                        </div>
                    </StylizedSection>
                    <StylizedSection>
                        <StylizedDescriptor title="Terms of Service"
                                            description="Please read the following and confirm acceptance of our terms of service." />
                        <div className="mt-5 md:mt-0 md:col-span-2">
                            <div className="w-72 text-center border-2 border-black rounded-xl p-2 bg-white hover:bg-black transition-all hover:text-white duration-200 hover:cursor-pointer px-8">
                                Review Terms of Service
                            </div>
                            <StylizedAgreement title=""
                                               description=""
                                               id="agree" checked={this.state.agree} onChange={this.handleChanges} disabled={this.state.disabled}/>
                        </div>
                        <StylizedSubmit text="Save" disabled={this.state.disabled} disabledtext="Edit"/>
                    </StylizedSection>
                </div>
            </form>
        );
    }
}