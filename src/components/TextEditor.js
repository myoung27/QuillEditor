import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import CharacterCounter from 'react-character-counter'
import Quill from 'quill';
import BlotFormatter from 'quill-blot-formatter';

Quill.register('modules/blotFormatter', BlotFormatter);

 
 


class TextEditor extends React.Component {
    constructor(props) {
      super(props)
      this.state = { 
        text: '',
        name: '' 
      }
      this.handleChange = this.handleChange.bind(this)
    }
  
    handleChange(value) {
      this.setState({ text: value })
    }

    componentWillMount() {
      localStorage.getItem('text') && this.setState({
        text: JSON.parse(localStorage.getItem('text'))
      })
    }
    
    
  
    
    
componentWillUpdate(nextProps, nextState) {
  localStorage.setItem('text', JSON.stringify(nextState.text));
  localStorage.setItem('time', Date.now());
}

  
    modules = {
      toolbar: [
        [{ 'header': [1, 2, false] },{ 'font': [] }],
        ['bold', 'italic', 'underline','strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}, { 'align': [] }],
        [{ 'color': [] }, { 'background': [] },'link', 'image'],
        ['clean']
      ],
      blotFormatter: {}
    }
  
    formats = [
      'header','font',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent','align',
      'color','background','link', 'image', 
    ]
  
  
    render() {
      return (
        <CharacterCounter value={this.state.text} maxLength={120} >
          <ReactQuill value={this.state.text}
                    theme="snow"
                    modules={this.modules}
                    formats={this.formats}
                    onChange={this.handleChange} />
        </CharacterCounter>
      )
    }
  }

  export default TextEditor
