
const BreadcrumbOne = ({title, customProp}) => {
    return (
        <div className="axil-breadcrumb-area breadcrumb-style-1 bg-color-grey" style={customProp ? { paddingBottom: 0 } : {}}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="inner">
                            <h1 className="page-title">{title}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BreadcrumbOne;