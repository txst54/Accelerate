import React from "react";

/**
 * Stylized Input for https://texascapitalcollective.org/profile
 * @author Clint Wang
 * Created 12/2023
 * @param props.id id of input
 * @param props.label label for input
 * @param props.value default value of input
 * @param props.required if input is required
 * @param props.disabled if input is disabled
 * @param props.type type of input
 * @param props.options options if props.type is 'select'
 * @param props.onChange function for changing input
 * @param props.width col-span of input for normal screens
 * @param props.smwidth col-span of input for small screens
 **/
export function StylizedInput(props) {
    return (
        <div className={`col-span-${props.width} sm:col-span-${props.smwidth}`}>
            <label
                htmlFor={props.id}
                className="block text-sm font-medium leading-5 text-gray-700"
            >
                {props.label + (props.required ? " *" : "")}
            </label>
            {
            props.type === "select" && props.options !== [] ?
                <select
                    required
                    disabled={props.disabled}
                    id={props.id}
                    name={props.id}
                    value={props.value}
                    onChange={props.onChange}
                    className="mt-1 block form-select w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                >
                    {props.options.map((option) => <option key={option}>{option}</option>)}
                </select>
            :
                <input
                    required={props.required}
                    disabled={props.disabled}
                    type={props.type}
                    id={props.id}
                    name={props.id}
                    value={props.value}
                    onChange={props.onChange}
                    className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
            }
        </div>
    )
}

StylizedInput.defaultProps = {
    id: "default",
    label: "Untitled",
    value: "",
    required: true,
    disabled: false,
    type: "input",
    onChange: (e) => console.log(e.target.value),
    width: 6,
    smwidth: 3
}

/**
 * Stylized Form Section Descriptor for https://texascapitalcollective.org/profile
 * @param props.title the title of descriptor
 * @param props.description the description
 */
export function StylizedDescriptor(props) {
    return (
        <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
                {props.title}
            </h3>
            <p className="mt-1 text-sm leading-5 text-gray-500">
                {props.description}
            </p>
        </div>
    )
}

/**
 * Stylized Form Section Container for https://texascapitalcollective.org/profile
 * @param props.children children of the container
 */
export function StylizedSection(props) {
    return (
        <div className="mt-6 bg-white drop-shadow-xl hover:drop-shadow-2xl transition-all duration-200 px-4 py-5 sm:rounded-lg sm:p-6">
            <div className="md:grid md:grid-cols-3 md:gap-6">
                {props.children}
            </div>
        </div>
    )
}

/**
 * Stylized Agreement Input for https://texascapitalcollective.org/profile
 * Rather than over-encapsulating StylizedInput, a separate class for Stylized Agreement Input
 * can be used due to differing styles and formats for a radio input
 * @param props.title title of the agreement
 * @param props.description description of agreement
 * @param props.id id of input
 * @param props.disabled if input is disabled
 * @param props.checked whether input is checked or not
 * @param props.onChange handle changes to radio input
 */
export function StylizedAgreement(props) {
    return (
        <fieldset className="">
            <legend className="text-base leading-6 font-medium text-gray-900">
                {props.title}
            </legend>
            <p className="text-sm leading-5 text-gray-500">
                {props.description}
            </p>
            <div className="mt-4">
                <div className="flex items-center">
                    <input
                        required
                        disabled={props.disabled}
                        type="radio"
                        className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                        id={props.id}
                        name={props.id}
                        checked={props.checked}
                        onChange={props.onChange}
                    />
                    <label htmlFor={props.id} className="ml-3">
                          <span className="block text-sm leading-5 font-medium text-gray-700">
                            I agree
                          </span>
                    </label>
                </div>
            </div>
        </fieldset>
    )
}

/**
 * Stylized Form Submit button for https://texascapitalcollective.org/profile
 * @param props.text text to show on the submit button
 * @param props.disabledtext
 * @param props.disabled
 */
export function StylizedSubmit(props) {
    return (
        <div className="mt-8 border-t border-gray-200 pt-5 col-span-3">
            <div className="flex justify-end">
                <span className="ml-3 inline-flex rounded-md shadow-sm">
                    <button className="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-red-500 hover:bg-red-400 focus:outline-none focus:border-amber-700 focus:shadow-outline-amber active:bg-amber-700 transition duration-150 ease-in-out">
                      {props.disabled ? props.disabledtext : props.text}
                    </button>
                </span>
            </div>
        </div>
    )
}