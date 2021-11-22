import {Component} from "react";

export class Pager extends Component {
    pageSize;
    canPreviousPage;
    canNextPage;
    pageCount;
    pageIndex = 0;
    pageOptions = this.props.pageOptions;
    componentWillMount() {
        this.setPageSize(10);
        this.canPreviousPage = this.pageIndex > 0;
        this.canNextPage = 1 >= this.pageOptions.length/this.pageSize;
    }

    render() {
        return(
        <div className="pagination">
            <button onClick={() => this.gotoPage(0)} disabled={!this.canPreviousPage}>
                {'<<'}
            </button>{' '}
            <button onClick={() => this.previousPage()} disabled={!this.canPreviousPage}>
                {'<'}
            </button>{' '}
            <button onClick={() => this.nextPage()} disabled={!this.canNextPage}>
                {'>'}
            </button>{' '}
            <button onClick={() => this.gotoPage(this.pageCount - 1)} disabled={!this.canNextPage}>
                {'>>'}
            </button>{' '}
            <span>
          Page{' '}
                <strong>
            {this.pageIndex + 1} of {this.pageOptions?.length}
          </strong>{' '}
        </span>
            <span>
          | Go to page:{' '}
                <input
                    type="number"
                    defaultValue={this.pageIndex + 1}
                    onChange={e => {
                        const page = e.target.value ? Number(e.target.value) - 1 : 0
                        this.gotoPage(page);
                    }}
                    style={{ width: '100px' }}
                />
        </span>{' '}
            <select
                value={this.pageSize}
                onChange={e => {
                    this.setPageSize(Number(e.target.value))
                }}
            >
                {[10, 20, 30, 40, 50].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                    </option>
                ))}
            </select>
        </div>
        );
    }

    gotoPage(number) {
        this.pageIndex = number;
        this.canPreviousPage = this.pageIndex > 0;
        this.canNextPage = 1 >= this.pageOptions.length/this.pageSize;
        console.log(this.canNextPage, this.canPreviousPage)
    }

    previousPage() {
        this.pageIndex --;
        this.gotoPage(this.pageIndex);
    }

    nextPage() {
        this.pageIndex ++;
        this.gotoPage(this.pageIndex);
    }

    setPageSize(number) {
        this.pageSize = number;
    }
}
