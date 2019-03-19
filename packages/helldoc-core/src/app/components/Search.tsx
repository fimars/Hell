import * as React from "react";

class Search extends React.Component<{}, { fullWidth: boolean }> {
  private inputRef: React.RefObject<HTMLInputElement>;
  constructor(props: any) {
    super(props);
    this.state = { fullWidth: false };
    this.inputRef = React.createRef();
  }

  isFullWidth() {
    if (window.innerWidth <= 545 && !this.state.fullWidth) {
      this.setState({ fullWidth: true });
      const node = this.inputRef.current;
      if (node) {
        node.focus();
      }
    }
  }

  miniWidth() {
    if (window.innerWidth <= 545) {
      this.setState({ fullWidth: false });
    }
  }

  render() {
    return (
      <div
        className="search-box"
        onClick={() => {
          this.isFullWidth();
        }}
      >
        <i className="fas fa-search search-icon" />
        <input
          ref={this.inputRef}
          type="text"
          onBlur={() => {
            this.miniWidth();
          }}
          className={`${this.state.fullWidth ? "full-width-input" : ""}`}
        />
      </div>
    );
  }
}

export default Search;
