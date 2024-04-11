export function splitTextIntoParagraphs(textArray, className) {
    return textArray.map((line, index) => 
        <p key={index} className={className}>{line}</p>
    );
}