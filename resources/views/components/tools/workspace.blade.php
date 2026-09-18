@props([
    'inputLabel' => 'Input',
    'outputLabel' => 'Hasil',
    'inputHint' => null,
    'placeholder' => '',
    'outputOnly' => false,
    'rows' => 16,
    'outputNote' => null,
])

<div data-tool-root class="mt-6 border-3 border-ink bg-white shadow-brutal">
    <div data-tool-actions class="flex flex-wrap items-center gap-2 border-b-3 border-ink bg-paper-dim p-3">
        {{ $actions }}

        @isset($options)
            <div data-tool-options class="ml-auto flex flex-wrap items-center gap-3">{{ $options }}</div>
        @endisset
    </div>

    <div @class(['grid gap-0', 'lg:grid-cols-2' => ! $outputOnly])>
        @unless ($outputOnly)
            <div class="border-ink p-4 lg:border-r-3">
                <label for="tool-input" class="flex items-center justify-between gap-2 font-mono text-xs font-bold uppercase tracking-widest">
                    {{ $inputLabel }}
                    @if ($inputHint)
                        <span class="normal-case tracking-normal text-ink-soft">{{ $inputHint }}</span>
                    @endif
                </label>
                <textarea id="tool-input"
                          data-tool-input
                          rows="{{ $rows }}"
                          spellcheck="false"
                          autocomplete="off"
                          autocapitalize="off"
                          placeholder="{{ $placeholder }}"
                          class="code-area mt-2 min-h-72 w-full resize-y border-3 border-ink bg-paper p-3 focus:bg-white">{{ $input ?? '' }}</textarea>
            </div>
        @endunless

        <div class="p-4">
            <div class="flex items-center justify-between gap-2">
                <label for="tool-output" class="font-mono text-xs font-bold uppercase tracking-widest">{{ $outputLabel }}</label>
                <span data-tool-stats class="font-mono text-xs text-ink-soft">0 baris · 0 byte</span>
            </div>
            <textarea id="tool-output"
                      data-tool-output
                      rows="{{ $rows }}"
                      readonly
                      spellcheck="false"
                      aria-label="{{ $outputLabel }}"
                      class="code-area mt-2 min-h-72 w-full resize-y border-3 border-ink bg-paper-dim p-3">{{ $output ?? '' }}</textarea>

            @if ($outputNote)
                <p class="mt-2 text-xs text-ink-soft">{{ $outputNote }}</p>
            @endif
        </div>
    </div>

    <div class="border-t-3 border-ink p-3">
        <p data-tool-error
           hidden
           role="alert"
           class="border-3 border-ink bg-punch p-3 font-mono text-sm font-bold"></p>

        <p data-tool-status
           data-tone="neutral"
           aria-live="polite"
           class="inline-flex items-center gap-2 border-2 border-ink bg-white px-3 py-1.5 font-mono text-xs font-bold uppercase data-[tone=ok]:bg-mint data-[tone=error]:bg-punch data-[tone=warn]:bg-sun">
            Siap
        </p>
    </div>
</div>
