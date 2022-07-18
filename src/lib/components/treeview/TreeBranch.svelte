<script context="module">
	let counter = 0;
</script>

<script lang="ts">
	export let rootContent: string = 'Root element missing';
	export let defaultClosed: boolean = false;
	let inputId = 'input_' + counter++;
</script>

<li>
	<input
		id={inputId}
        name={inputId}
		class="css-checkbox"
		type="checkbox"
		checked={!defaultClosed}
		on:click={() => {
			console.log('check clicked');
		}}
	/>
	<label for={inputId} class="css-label">
		<span class="fa fa-plus" />
		<span class="fa fa-minus" />
	</label>
	<span
		class="tree_label"
		on:click={() => {
			console.log('label clicked');
		}}
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
		content: '+';
		text-align: center;
		line-height: 0.9em;
	}
	:checked ~ .tree_label:before {
		content: '–';
	}

	/* ————————————————————–
    Tree branches
    */
	.tree_label:after {
		border-bottom: 0;
	}

	.css-label {
		cursor: pointer;
		position: absolute;
    	left: -17px;
    	z-index: 5;
	}
	.css-checkbox {
		display: none;
	}
	.fa {
		color: white;
		line-height: 16px;
		border-radius: 4px;
	}
	.fa-plus {
		padding-top: 2px;
		padding-right: 2px;
		padding-left: 2px;
		background-color: gray;
	}
	.fa-minus {
		padding-top: 1px;
		padding-right: 2px;
		padding-left: 2px;
		background-color: gray;
		display: none;
	}
	.css-checkbox:checked + .css-label .fa-minus {
		display: inline;
	}
	.css-checkbox:checked + .css-label .fa-plus {
		display: none;
	}

</style>
