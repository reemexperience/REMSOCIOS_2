import { Children, Fragment, useMemo } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SelectInput({
    className = '',
    children,
    value,
    onChange,
    name,
    disabled = false,
    placeholder = 'Selecciona una opción',
}) {
    const options = useMemo(
        () =>
            Children.toArray(children ?? [])
                .filter(Boolean)
                .map((child) => ({
                    value: child.props.value,
                    label: child.props.children,
                    disabled: child.props.disabled ?? false,
                })),
        [children]
    );

    const selectedOption = options.find((option) => option.value === value) ?? null;

    const handleChange = (nextValue) => {
        onChange?.({
            target: {
                name,
                value: nextValue,
            },
        });
    };

    return (
        <div className="relative w-full">
            {name ? <input type="hidden" name={name} value={value ?? ''} /> : null}

            <Listbox value={value} onChange={handleChange} disabled={disabled}>
                <div className="relative">
                    <Listbox.Button
                        className={cn(
                            'relative w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 pr-10 text-left text-white shadow-sm transition',
                            'focus:border-rem-blue focus:outline-none focus:ring-2 focus:ring-rem-blue/40',
                            'disabled:cursor-not-allowed disabled:opacity-60',
                            className
                        )}
                    >
                        <span className={cn('block truncate', !selectedOption && 'text-white/40')}>
                            {selectedOption ? selectedOption.label : placeholder}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-white/55">
                            <ChevronDown size={18} />
                        </span>
                    </Listbox.Button>

                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute z-50 mt-2 max-h-72 w-full overflow-auto rounded-2xl border border-white/10 bg-rem-dark/95 p-2 shadow-[0_24px_60px_rgba(0,0,0,0.45)] ring-1 ring-white/5 backdrop-blur-xl focus:outline-none">
                            {options.map((option) => (
                                <Listbox.Option
                                    key={option.value}
                                    value={option.value}
                                    disabled={option.disabled}
                                    className={({ active, disabled: optionDisabled }) =>
                                        cn(
                                            'relative cursor-pointer select-none rounded-xl px-4 py-3 pr-10 text-sm text-white/80 transition',
                                            active && 'bg-rem-blue text-white shadow-glow',
                                            optionDisabled && 'cursor-not-allowed opacity-50'
                                        )
                                    }
                                >
                                    {({ selected }) => (
                                        <>
                                            <span className={cn('block truncate', selected && 'font-semibold')}>
                                                {option.label}
                                            </span>
                                            {selected ? (
                                                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-rem-green">
                                                    <Check size={16} />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );
}
