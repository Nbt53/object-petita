export default function BlogContent({ type, name, value, handleChange, contentRef }) {
    const InputTag = type === 'textarea' ? 'textarea' : 'input';

    return (
        <InputTag
            ref={type === 'textarea' ? contentRef : null}
            type={type === 'textarea' ? undefined : type}
            name={name}
            value={value}
            onChange={handleChange}
            rows={type === 'textarea' ? 1 : null}
        />
    )
}