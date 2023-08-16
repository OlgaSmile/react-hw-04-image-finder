import css from './Modal.module.css';
import { createPortal } from 'react-dom';
import { Component } from 'react';

const portal = document.getElementById('modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.closeModal);
  }

  closeModal = e => {
    if (e.code === 'Escape' || e.currentTarget === e.target) {
      this.props.modalToggle();
    }
  };
  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModal);
  }

  render() {
    return createPortal(
      <div className={css.Overlay} onClick={this.closeModal}>
        <div className={css.Modal}>
          <img src={this.props.largeImageURL} alt={this.props.tags} />
        </div>
      </div>,
      portal
    );
  }
}