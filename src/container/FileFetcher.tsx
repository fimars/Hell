import * as React from 'react';
import { fetchFile } from '../lib/helper';

export interface FileFetcherProps {
  filepath: string;
  onNotFound: (e: Error) => void;
}
export interface FileFetcherState {
  fileRaw: string;
}
export default class FileFetcher extends React.Component<
  FileFetcherProps,
  FileFetcherState
> {
  constructor(props) {
    super(props);
  }
  public async fetchData() {
    const { filepath, onNotFound } = this.props;
    try {
      const fileRaw = await fetchFile(filepath);
      this.setState({ fileRaw });
    } catch (e) { onNotFound(e) }
  }
  render() {
    return this.props.children;
  }
}
