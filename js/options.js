var possibleOptions = ['enabled', 'fangraphs', 'baseballreference', 'razzball', 'savant', 'bp', 'espn', 'cbs', 'yahoo', 'toolbar'];
var options;

function saveOptions() {
    possibleOptions.forEach(function (name) {
        getFormValues(name);
    });
    setOptions(function () {
        $('#status').stop().css('opacity', 1).show().delay(1000).fadeOut(3000);
    });
}

function restoreOptions() {
    getOptions(function (opt) {
        options = opt;
        possibleOptions.forEach(function (name) {
            populateFormValues(name);
        });
    });
}

function populateFormValues(name) {
    $('input[name=' + name + ']').prop('checked', options[name]);
}

function getFormValues(name) {
    options[name] = $('input[name=' + name + ']').prop('checked');
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector('#save').addEventListener('click', saveOptions);