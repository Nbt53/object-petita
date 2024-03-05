import Navigator from "../config/Navigator";

export default function Title({ renderView, setCurrentView }) {

    return (
        <div className="header">
            <h1 className="header-title mb-small">Object Petit a</h1>
            <Navigator renderView={renderView} setCurrentView={setCurrentView} />
        </div>
    )
}