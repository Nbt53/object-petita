import { ThreeDots } from 'react-loader-spinner'

export default function Submitting({text}) {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            flexDirection: 'column'
        }}>
            <ThreeDots
                visible={true}
                height="110"
                width="110"
                color="#FEC89A"
                radius="11"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
            <p>{text}...</p>
        </div>
    )
}