'use babel';

import GamingSlotView from './gaming-slot-view';
import { CompositeDisposable } from 'atom';

export default {

  gamingSlotView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.gamingSlotView = new GamingSlotView(state.gamingSlotViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.gamingSlotView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'gaming-slot:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.gamingSlotView.destroy();
  },

  serialize() {
    return {
      gamingSlotViewState: this.gamingSlotView.serialize()
    };
  },

  toggle() {
    console.log('GamingSlot was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
