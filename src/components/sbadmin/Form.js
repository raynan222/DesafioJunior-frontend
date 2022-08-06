import React, { Component } from 'react';
import getMessage from '../../sets/Messages';
import { regexInput } from '../utils/Utils';
import { SplitButton } from '../sbadmin/Button';
import RestService from '../../services/Rest';
import Select from "react-select";

const Rest = new RestService();

class TextField extends Component
{
    constructor(props)
    {
        super(props)
        
        this.state = {
            value: "",
            deleteKeyPressed: false,
            backspaceKeyPressed: false,
            selectionPosition: 0,
            atualInputLength: 0,
        }
        
        this.input = React.createRef();
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnKeyDown = this.handleOnKeyDown.bind(this);
    }

    static defaultProps = {
        required: false,
    }

    componentDidMount() {
        this.input.current.value = regexInput(this.input.current.value, this.props.represent)
        
        if (this.props.value)
        {
            this.props.onChange({
                target: {
                    name: this.props.name,
                    value: regexInput(this.input.current.value, this.props.represent),
                }
            })
        }
    }

    handleOnChange(e) 
    {
        e.target.value = regexInput(e.target.value, this.props.represent)
        this.props.onChange(e);

        if (this.state.deleteKeyPressed) 
        {
            e.target.selectionStart = this.state.selectionPosition;
            e.target.selectionEnd = this.state.selectionPosition;

            this.setState({
                deleteKeyPressed: false,
            });
        } 
        else if (this.state.backspaceKeyPressed) 
        {
            if (e.target.value.length < this.state.atualInputLength)
            {
                e.target.selectionStart = this.state.selectionPosition - 1;
                e.target.selectionEnd = this.state.selectionPosition - 1;
            } else 
            {
                e.target.selectionStart = this.state.selectionPosition;
                e.target.selectionEnd = this.state.selectionPosition;
            }
            
            this.setState({
                backspaceKeyPressed: false,
            });
        }
    }

    handleOnKeyDown(e)
    {
        if (e.key === "Delete") {
            this.setState({
                deleteKeyPressed: true,
                selectionPosition: e.target.selectionStart,
            });
        } else if (e.key === "Backspace" && e.target.selectionStart > 0) {
            this.setState({
                backspaceKeyPressed: true,
                selectionPosition: e.target.selectionStart,
                atualInputLength: e.target.value.length,
            });
        }
    }

    render()
    {
        const required = this.props.required ? "*" : "";
        const type = this.props.represent === "password" ? "password" : "text";
        
        return (
            <div className={ "form-group col-md-" + this.props.size }>
                <label htmlFor={ this.props.name }>{ getMessage(this.props.label) }{ required }</label>
                <input 
                    type={ type }
                    id={ this.props.name } 
                    name={ this.props.name } 
                    ref={ this.input }
                    className="form-control"
                    placeholder={ getMessage(this.props.placeholder) }
                    onChange={ this.handleOnChange }
                    required={ this.props.required }
                    onKeyDown={ this.handleOnKeyDown }
                    defaultValue={ this.props.value }
                />
                <small className="form-text text-muted">{ this.props.error ? this.props.error.message : '' }</small>
            </div>
        );
    }
}

/*----------------------------------------------------------------------------------------------------*/

class CurrencyField extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            value: "",
        }
        
        this.input = React.createRef();
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnFocus = this.handleOnFocus.bind(this);
        this.handleOnKeyUp = this.handleOnKeyUp.bind(this);
    }

    static defaultProps = {
        required: false,
    }

    componentDidMount() {
        this.input.current.value = regexInput(this.input.current.value, "money");
        
        if (this.props.value)
        {
            let cleanVal = regexInput(this.input.current.value, "money");
            cleanVal = cleanVal.replace(/\./g, "");
            cleanVal = cleanVal.replace(/,/g, ".");
            this.props.onChange({target: {name: this.props.name, value: cleanVal}});
        }
    }

    handleOnChange(e) {
        e.target.value = regexInput(e.target.value, "money");

        let cleanVal = e.target.value;
        cleanVal = cleanVal.replace(/\./g, "");
        cleanVal = cleanVal.replace(/,/g, ".");
        this.props.onChange({target: {name: this.props.name, value: cleanVal}});
    }
    
    handleOnFocus(e) 
    {
        e.target.selectionStart = e.target.value.length;
        e.target.selectionEnd = e.target.value.length;
    }

    handleOnKeyUp(e) 
    {
        if (e.key === "ArrowLeft") 
        {
            e.target.selectionStart = e.target.value.length;
            e.target.selectionEnd = e.target.value.length;
        }
    }

    render()
    {
        return (
            <div className={ "form-group col-md-" + this.props.size }>
                <label htmlFor={ this.props.name }>{ getMessage(this.props.label) }</label>
                <input 
                    type="text"
                    id={ this.props.name } 
                    name={ this.props.name } 
                    ref={ this.input }
                    className="form-control"
                    placeholder={ getMessage(this.props.placeholder) } 
                    onChange={ this.handleOnChange }
                    onKeyUp={ this.handleOnKeyUp }
                    defaultValue={ this.props.value }
                    required={ this.props.required }
                    onFocus={ this.handleOnFocus }
                    onClick={ this.handleOnFocus }
                />
                <small className="form-text text-muted">{ this.props.error ? this.props.error.message : '' }</small>
            </div>
        );
    }
}

/*----------------------------------------------------------------------------------------------------*/

class CheckboxField extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            value: false,
        }

        this.handleOnChange = this.handleOnChange.bind(this);
    }

    static defaultProps = {
        size: 5
    }

    componentDidMount() 
    {
        this.setState({
            value: this.props.value,
        });

        if (this.props.value !== undefined)
        {
            this.props.onChange({
                target: {
                    name: this.props.name, 
                    value: this.props.value || false,
                }
            });
        }
    }

    handleOnChange(e) 
    {
        this.setState({
            value: e.target.checked,
        });

        this.props.onChange({
            target: {
                name: this.props.name, 
                value: e.target.checked,
            }
        });
    }

    render()
    {
        return (
            <div className={ "form-check form-check-inline col-md-" + this.props.size }>
                <input type="checkbox" className="form-check-input" id={ this.props.name } onChange={ this.handleOnChange } checked={ this.state.value || false } />
                <label className="form-check-label" htmlFor={ this.props.name }>{ getMessage(this.props.label) }</label>
                <small className="form-text text-muted">{ this.props.error ? this.props.error.message : '' }</small>
            </div>
        )
    }
}

/*----------------------------------------------------------------------------------------------------*/

class TextareaField extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            value: "",
        }
        
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    static defaultProps = {
        rows: 3,
        size: 12,
        required: false, 
    }

    componentDidMount()
    {
        this.setState({
            value: this.props.value,
        })

        if (this.props.value)
        {
            this.props.onChange({
                target: {
                    value: this.state.value,
                    name: this.props.name,
                }
            });
        }
    }

    handleOnChange(e)
    {
        this.setState({
            value: e.target.value
        });
        
        this.props.onChange({
            target: {
                value: e.target.value,
                name: this.props.name,
            }
        });
    }

    render() 
    {
        return (
            <div className={ "form-group col-md-" + this.props.size }>
                <label htmlFor={ this.props.name }>{ getMessage(this.props.label) }</label>
                <textarea 
                    required={ this.props.required } 
                    className="form-control" 
                    id={ this.props.name } 
                    name={ this.props.name } 
                    value={ this.state.value }
                    onChange={ this.handleOnChange }
                    rows={ this.props.rows }>
                </textarea>
                <small className="form-text text-muted">{ this.props.error ? this.props.error.message : '' }</small>
            </div>
        );
    }
}

/*----------------------------------------------------------------------------------------------------*/

class SaveButton extends Component
{
    render() 
    {
        return (
            <SplitButton type="primary" icon="save" text="app.layout.labels.buttons.save" onClick={ this.props.onClick }/>
        )
    }
}

/*----------------------------------------------------------------------------------------------------*/

class CancelButton extends Component
{
    render() 
    {
        return (
            <SplitButton type="danger" icon="cancel" text="app.layout.labels.buttons.cancel" onClick={ this.props.onClick }/>
        )
    }
}

/*----------------------------------------------------------------------------------------------------*/

class InputInGroup extends Component 
{
    render() 
    {
        let classValue= "is-invalid form-control";

        if (this.props.errors[this.props.name]) {
            classValue = "is-invalid form-control";
        } 
        else {
            classValue = "form-control";
        }

        return (
            <div className= {"form-group col " + (this.props.colsize ? "col-md-" + this.props.colsize : "")  }>
                <label>{ getMessage(this.props.label) }</label>
                <input type={ this.props.type } className={ classValue } id={ this.props.name }  name={ this.props.name }
                    required={ this.props.required } disabled={this.props.disabled} value={this.props.value} autoFocus={ this.props.autofocus } onChange={ this.props.onChange } />
                <div className="invalid-feedback">
                    { this.props.errors[this.props.name] ? this.props.errors[this.props.name] : '' }
                </div>
            </div>
        );
    }
}

//----------------------------------------------------------------------------------------------------/

class SelectField extends Component
{
	constructor(props)
	{
		super(props);

		this.state = {

			options: this.props.options ? this.props.options: []
		};

		this.handleReceiveOption = this.handleReceiveOption.bind(this);
		this._isMounted = false;
	}

	async handleReceiveOption(res)
	{
		if (res.status === 200) {
			this._isMounted && this.setState({
				options: res.data.itens
			});
		}
	}

	componentDidMount()
	{
		this._isMounted = true;
		console.log(this.props.url);
		this._isMounted && Rest.get(this.props.url, this.props.urlParameters).then(this.handleReceiveOption);
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	concatenarValues(data) {
		let keys = Object.keys(data);
		let value = "";
		keys.forEach( function (key) {
			value += key + ":"+ data[key] + "/ "
		});
		return value;
	}
	render()
	{
		let classValue;
		let key;

		if (this.props.errors[this.props.name]) {
			classValue = "is-invalid form-control";
		}
		else {
			classValue = "form-control";
		}

		key=1;
		console.log(this.state.options);
		const options = this.state.options.map((data) =>
			<option key={key++} value={data[this.props.value_name?this.props.value_name:this.props.name]}>{ data.nome ? data.nome: this.concatenarValues(data) }</option>
		);


		return (
			<div className= { "form-group col " + (this.props.colsize ? "col-md-" + this.props.colsize : "") }>
				<label>{ getMessage(this.props.label) }</label>
				<select className={ classValue } id={ this.props.name }  name={ this.props.name }
						required={ this.props.required } value={this.props.value} autoFocus={ this.props.autofocus } onChange={ this.props.onChange }>
					{ this.props.empty === true ? <option value=""/> : '' }
					{ options }
				</select>

				<div className="invalid-feedback">
					{ this.props.errors[this.props.name] ? this.props.errors[this.props.name] : '' }
				</div>
			</div>
		);
	}
}

//----------------------------------------------------------------------------------------------------/

class ButtonSubmit extends Component 
{
    render() 
    {
        return (
            <input className='btn btn-primary button-form' value={ getMessage(this.props.text) } type="submit" 
                onClick={ this.props.onClick } />
        );
    }
}

//----------------------------------------------------------------------------------------------------/

class ButtonCancel extends Component 
{
    render() 
    {
        return (
            <input className='btn btn-danger button-form' value={ getMessage(this.props.text) } type="submit" 
                onClick={ this.props.onClick } />
        );
    }
}

//----------------------------------------------------------------------------------------------------/

class Select2Field extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        options: [],
        isLoading: false,
        selectedValue: null,
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleOnInputChange = this.handleOnInputChange.bind(this);
      this.handleReceiveOptions = this.handleReceiveOptions.bind(this);
      this.handleReceiveInitSelection = this.handleReceiveInitSelection.bind(
        this
      );
    }
  
    static defaultProps = {
      minLengthInput: 3,
      value: null,
      required: false,
      placeholder: "layout.select-field.placeholder",
    };
  
    componentDidUpdate(prevProps, prevState, snapshot) {
      if (prevProps.value !== this.props.value) {
        Rest.get(`${this.props.url_view}/${this.props.value}`, {}).then(
          this.handleReceiveInitSelection
        );
      }
    }
  
    componentDidMount() {
      if (this.props.value) {
        Rest.get_unauthenticated(`${this.props.url_view}/${this.props.value}`).then(
          this.handleReceiveInitSelection
        );
      } else {
        Rest.get_unauthenticated(this.props.url_list, this.props.urlParameters).then(
          this.handleReceiveOptions
        );
      }
    }
  
    handleChange(e) {
      this.setState({
        selectedValue: e,
      });

      const event = {
        target: {
          name: this.props.name,
          value: e !== null ? e.value : null,
          label: e !== null ? e.label : null,
        },
      };
      this.props.onChange(event);
    }
  
    handleOnInputChange(e) {
      if (
        e.length >= this.props.minLengthInput ||
        (e.length === 0 && this.state.selectedValue === null)
      ) {
        this.setState({
          isLoading: true,
          selectedValue: null,
          value: null,
        });
  
        Rest.get_unauthenticated(this.props.url_list, {
          ...this.props.urlParameters,
          [this.props.filterName]: e,
        }).then(this.handleReceiveOptions);
      }
    }
  
    handleReceiveOptions(res) {
      this.setState({
        isLoading: false,
      });
  
      if (!res.data.error) {
        let self = this;
        let options = res.data.itens.map((item) => {
          let label = self.props.displayName
            .map((fld) => {
              const reducer = (acc, cur) => acc[cur];
              return fld.split(".").reduce(reducer, item);
            })
            .join(" - ");
  
          return { label: label, value: item.id };
        });
  
        this.setState({
          options: options,
        });
      }
    }
  
    handleReceiveInitSelection(res) {
      if (!res.data.error) {
        let label = this.props.displayName
          .map((fld) => {
            const reducer = (acc, cur) => acc[cur];
            return fld.split(".").reduce(reducer, res.data);
          })
          .join(" - ");
  
        this.setState({
          selectedValue: { value: res.data.id, label: label },
        });
      }
    }
  
    render() {
      return (
        <div
          className={
            "form-group " +
            (this.props.colsize ? "col-md-" + this.props.colsize : "")
          }
        >
          <label>
            {getMessage(this.props.label)}
            {this.props.required ? "*" : ""}
          </label>
          <Select
            autoFocus={this.props.autofocus}
            options={this.state.options}
            onChange={this.handleChange}
            isLoading={this.state.isLoading}
            onInputChange={this.handleOnInputChange}
            isClearable={!this.props.required}
            value={this.state.selectedValue}
            placeholder={getMessage(this.props.placeholder)}
          />
          <div className="invalid-message">
            {this.props.errors[this.props.name]
              ? this.props.errors[this.props.name]
              : ""}
          </div>
        </div>
      );
    }
}

export { TextField, CurrencyField, CheckboxField, TextareaField, SaveButton, CancelButton, SelectField, InputInGroup, ButtonCancel, ButtonSubmit, Select2Field}