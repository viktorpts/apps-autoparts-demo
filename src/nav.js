export function showView(sectionId, callback, param) {
    document.querySelectorAll('section').forEach(s => s.style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';

    if (callback) {
        callback(param);
    }
}