const entries = [
    {
        entry: 'core/whiteboard.js',
        format: 'umd',
        dest: 'dist/whiteboard.js' // equivalent to --output
    },
    {
        entry: 'core/client.js',
        format: 'umd',
        dest: 'dist/chat.js' // equivalent to --output
    }
];

export default entries;