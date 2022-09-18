<script context="module">
	let counter = 0;
</script>

<script lang="ts">
	export let rootContent: string = 'Root element missing';
	export let defaultClosed: boolean = false;
	export let onClick = () => {};
	export let selected;
	let inputId = 'input_' + counter++;
</script>

<li>
	<input
		id={inputId}
        name={inputId}
		class="css-checkbox"
		type="checkbox"
		checked={!defaultClosed}
	/>
	<label for={inputId} class="css-label">
		<span class="fa fa-plus fa-xs" />
		<span class="fa fa-minus fa-xs" />
	</label>
	<span
		class="tree_label"
		class:selected
		on:click={onClick}
	>
		<slot name="root">
			{rootContent}
		</slot>
	</span>
	<ul>
		<slot name="children">
			<slot />
		</slot>
	</ul>
</li>

<style>
	/* ————————————————————–
    Tree core styles
    */
	input {
		position: absolute;
		left: -18px;
		top: 14px;
		z-index: 10;
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
	li {
    	list-style-type: none;
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
    Tree branches
    */
	.tree_label:after {
		border-bottom: 0;
	}

	:global(:checked ~ span).tree_label:after {
        border-radius: 0 0.3em 0 0;
        border-top: 2px solid var(--line-color);
        border-right: 2px solid var(--line-color);
        border-bottom: 0;
        border-left: 0;
        bottom: 0;
        top: 0.5em;
        height: auto;
    }

	.css-label {
		cursor: pointer;
		position: absolute;
    	left: -25px;
    	z-index: 5;
	}
	.css-checkbox {
		display: none;
	}
	.fa {
		background: var(--icon-background-color);
		color: var(--icon-color);
		position: relative;
		left: 34px;
		top: 1px;
		z-index: 1;
		float: left;
		margin: 0 1em 0 -2em;
		width: 1em;
		height: 1em;
		border-radius: 1em;
		text-align: center;
		line-height: 1.3em;
		width: 15px;
		height: 15px;
	}

	.fa-minus {
		display: none;
	}
	.css-checkbox:checked + .css-label .fa-minus {
		display: inline;
	}
	.css-checkbox:checked + .css-label .fa-plus {
		display: none;
	}
	.selected {
		border: 1px dotted;
	}
</style>
