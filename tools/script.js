const searchInput = document.querySelector('#tool-search');
const toolCards = [...document.querySelectorAll('.tool-card')];
const resultCount = document.querySelector('#result-count');
const emptyState = document.querySelector('#empty-state');
searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLocaleLowerCase();
    let visibleCount = 0;

    for (const card of toolCards) {
        const searchableText = `${card.textContent} ${card.dataset.search}`.toLocaleLowerCase();
        const matches = searchableText.includes(query);
        card.hidden = !matches;
        if (matches) visibleCount += 1;
    }

    resultCount.textContent = query ? `找到 ${visibleCount} 項工具` : `共 ${visibleCount} 項工具`;
    emptyState.hidden = visibleCount !== 0;
});
