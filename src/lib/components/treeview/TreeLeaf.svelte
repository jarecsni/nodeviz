<li>
    <span class="tree_label" class:selected on:click={onClick}>
        <slot />
    </span>
</li>

<script>
    export let onClick = () => {};
    export let selected = false;
</script>

<style>
    li {
        line-height: 1.2;
        position: relative;
        padding: 0 0 1em 1em;
    }

    .tree_label {
        position: relative;
        display: inline-block;
        cursor: pointer;
    }

    .tree_label:hover {
		color: var(--branch-hover-color);
	}

    .selected {
        border: 1px dotted;
    }

</style>