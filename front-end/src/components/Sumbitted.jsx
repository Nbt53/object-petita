export default function Submitted({ setSubmitted }) {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            flexDirection: 'column'
        }}>
            <h1>Submitted</h1>
            <button onClick={() => setSubmitted(false)}>Submit another?</button>
        </div>
    )
}