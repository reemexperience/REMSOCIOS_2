export default function TextareaInput({ className = '', ...props }) {
    return (
        <textarea
            {...props}
            className={
                'w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white shadow-sm focus:border-rem-blue focus:outline-none focus:ring-2 focus:ring-rem-blue/40 ' +
                className
            }
        />
    );
}
