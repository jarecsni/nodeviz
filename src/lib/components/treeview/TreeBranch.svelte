<li>
    <input type="checkbox" checked={!defaultClosed} id={inputId} />
    <label class="tree_label" for={inputId}>
        <slot name="root">
            {rootContent}
        </slot>
    </label>
    <ul>
        <slot name="children">
            <slot>
            </slot>
        </slot>
    </ul>
</li>

<script context="module">
    let counter = 0;
</script>

<script lang="ts">
    export let rootContent: string = "Root element missing";
    export let defaultClosed: boolean = false;
    let inputId = "input_" + counter++;
</script>

<style>
    /* ————————————————————–
    Tree core styles
    */
    input {
        position: absolute;
        clip: rect(0, 0, 0, 0);
    }
    input ~ ul {
        display: none;
    }
    input:checked ~ ul {
        display: block;
    }

    /* ————————————————————–
    Tree rows
    */
    li {
        line-height: 1.2;
        position: relative;
        padding: 0 0 1em 1em;
    }

    /* ————————————————————–
    Tree labels
    */
    .tree_label {
        position: relative;
        display: inline-block;

        cursor: pointer;
    }

    .tree_label:hover {
        color: var(--branch-hover-color);
    }

    /* ————————————————————–
    Tree expanded icon
    */
    .tree_label:before {
        background: var(--icon-background-color);
        color: var(--icon-color);
        position: relative;
        z-index: 1;
        float: left;
        margin: 0 1em 0 -2em;
        width: 1em;
        height: 1em;
        border-radius: 1em;
        content: "+";
        text-align: center;
        line-height: 0.9em;
    }
    :checked ~ .tree_label:before {
        content: "–";
    }

    /* ————————————————————–
    Tree branches
    */
    .tree_label:after {
        border-bottom: 0;
    }

    :checked ~ label.tree_label:after {
        border-radius: 0 0.3em 0 0;
        border-top: 2px solid var(--line-color);
        border-right: 2px solid var(--line-color);
        border-bottom: 0;
        border-left: 0;
        bottom: 0;
        top: 0.5em;
        height: auto;
    }
</style>