import "./styles.scss";


type PageHeaderContentProps = {
    headerText: string;
  };

const PageHeaderContent: React.FC<PageHeaderContentProps> = ({ headerText }) => {
    return (
        <div className="wrapper">
            <span>{headerText}</span>
        </div>
    )
}

export default PageHeaderContent;