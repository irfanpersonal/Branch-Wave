import Select from 'react-select';
import {countries} from '../utils';

const RegisterBox: React.FunctionComponent = () => {
    return (
        <>
            <div>
                <label htmlFor="name">Name</label>
                <input id="name" type="text" name="name" required/>
            </div>
            <div>
                <label htmlFor="email">Email Address</label>
                <input id="email" type="email" name="email" required/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input id="password" type="password" name="password" required/>
            </div>
            <div>
                <label htmlFor="country">Country</label>
                <Select required id="country" name='country' options={countries.map((country) => {
                    return {
                        label: country,
                        value: country
                    };
                })}></Select>
            </div>
        </>
    );
}

export default RegisterBox;