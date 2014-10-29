var category = {};
var publisher = {};
var application = {};
var agency = {};
var units = 0;
var ignoreMinimums = false;

var publisherProgress = 0;
var applicationProgress = 0;
var agencyProgress = 0;
var unitsProgress = 0;
var ignoreUnitsProgress = 0;
function setProgress() {
   var pct = publisherProgress + applicationProgress + agencyProgress +
       ((ignoreUnitsProgress > unitsProgress) ? ignoreUnitsProgress : unitsProgress);
   $('#total-progress').attr('aria-valuenow', pct).css('width', pct + '%');
   $('#total-progress-sr-only').text(pct + '% Complete');
}

var allAgencies = [];
var allAgenciesIndex = {};
knownAgencies.forEach(function(agency, agencyIndex, agencyArray) {
    allAgenciesIndex[agency.id] = allAgencies.push(new CAPAgency(agency));
});

/*
allAgencies.forEach(function(agency, agencyIndex, agencyArray) {
    console.log(agency.toString());
});
*/

var allElas = [];
var allElasIndex = {};
var availableElasIndex = {};
knownElas.forEach(function(ela, elaIndex, elaArray) {
    var newEla = new CAPEla(ela);
    allElas.push(newEla);
    allElasIndex[ela.id] = (newEla);
});

function updateAvailableElas() {
    if (agency.id && publisher.shortname && application.shortname && (units > 0)) {
        var foundOne = false;
        availableElasIndex = {};
        $.each(allElasIndex, function(key, value) {
            var q = allElasIndex[key].minimumOrderForAgencyPublisherProduct(
                agency.id, publisher.shortname, application.shortname);
            if ((q !== -1) && ((ignoreMinimums === true) || (units >= q))) {
               availableElasIndex[key] = value;
               foundOne = true;
               console.log('agency: ' + agency.abbrev + '\n' +
                    'publisher: ' + publisher.name + '\n' +
                    'product: ' + application.name + '\n' +
                    'units: ' + units);
            }
            else {
                console.log('no match');
            }
        });
        console.log(allElasIndex);
        if (foundOne) {
            var elaHtml = '';
            $.each(availableElasIndex, function(key, value) {
                elaHtml += '<li>' + key + '</li>';
            });
            $('#matching-elas').html(elaHtml);
        }
        else {
            $('#matching-elas').text('No matching results');
        }
    }
}

/*
allElas.forEach(function(ela, elaIndex, elaArray) {
    console.log(ela.toString());
});
*/
$('#launch-quickbuy').on('click', function(ev) {
    $('#sw-quick-buy').modal();
    setProgress();
    // Populate the category pull-down
    var optionHtml = '<option disabled selected value="none">Category&hellip;</option>';
    categories.forEach( function(cat, catIndex, catArray) {
        optionHtml += 
            '<option value="' + cat.shortname + '" class="digsvc-cat-option" id="digsvc-cat-' +
                    cat.shortname + '" data-cat-name="' + cat.shortname + '">' + cat.name + '</option>';
    });
    $('#select-category').html(optionHtml);

    // Populate the publisher pull-down
    var optionHtml = '<option disabled selected value="none">Publisher&hellip;</option>';
    catalog.forEach( function(pub, pubIndex, pubArray) {
        optionHtml += 
            '<option value="' + pub.shortname + '" class="digsvc-pub-option" id="digsvc-pub-' +
                    pub.shortname + '" data-pub-name="' + pub.shortname + '">' + pub.name + '</option>';
    });
    $('#select-publisher').html(optionHtml);

    // handler for selecting by publisher
    $('select#select-publisher').on('change', function (ev) {
        publisherProgress = 25;
        applicationProgress = 0;
        setProgress();
        category = {};
        application = {};
        catalog.some(function(val, indx, array) {
            if (val["shortname"] === ev.currentTarget.value) {
                publisher = val;
                updateAvailableElas();
                return true;
            }
        });
        optionHtml = 
            '<option disabled selected value="none">Select&hellip;</option>';
        publisher.apps.forEach( function(app, appIndex, appArray) {
            optionHtml += 
                '<option value="' + app.shortname + '" class="digsvc-app-option" id="digsvc-app-' +
                app.shortname + '" data-app-name="' + app.shortname + '">' + app.name + '</option>';
        });
        $('select#select-category').val('none');
        $('#digsvc-app-list').css('visibility', 'visible');
        $('#select-app').html(optionHtml);
    });

    // handler for selecting by category
    $('select#select-category').on('change', function (ev) {
        publisherProgress = 25;
        applicationProgress = 0;
        setProgress();
        category = {};
        publisher = {};
        application = {};
        updateAvailableElas();
        categories.some(function(val, indx, array) {
            if (val["shortname"] === ev.currentTarget.value) {
                category = val;
                return true;
            }
        });
        optionHtml = 
            '<option disabled selected value="none">Select&hellip;</option>';
        catalog.forEach( function(pub, pubIndex, pubArray) {
            pub.apps.forEach( function(app, appIndex, appArray) {
                app.categories.some( function(cat, catIndex, catArray) {
                    if (cat === category.shortname) {
                        optionHtml += 
                            '<option value="' + app.shortname + '" class="digsvc-app-option" id="digsvc-app-' +
                            app.shortname + '" data-pub-short-name="' + pub.shortname + '" data-app-name="' + app.shortname + '">' + app.name + '</option>';
                    }
                });
            });
        });
    $('#digsvc-app-list').css('visibility', 'visible');
    $('#select-app').html(optionHtml);
    $('select#select-publisher').val('none');
    });

    // When an app is picked
    $('select#select-app').on('change', function (ev) {
        applicationProgress = 25;
        setProgress();
        
        catalog.some(function(val, indx, array) {
            if (val["shortname"] === $(ev.currentTarget).children('option[value="' +
                            $(ev.currentTarget).val() + '"]').attr('data-pub-short-name')) {
                publisher = val;
                return true;
            }
        });
        publisher.apps.some(function(val, indx, array) {
            if (val["shortname"] === ev.currentTarget.value) {
                application = val;
                updateAvailableElas();
                return true;
            }
        });
    });

    // Populate the agency pull-down
    var optionHtml = '<option disabled selected value="none">Agency&hellip;</option>';
    allAgencies.forEach( function(agency, agencyIndex, agencyArray) {
        optionHtml += 
            '<option value="' + agency.id + '" class="digsvc-agency-option" id="digsvc-agency-' +
                    agency.id + '" data-agency-name="' + agency.id + '">' + agency.abbrev + '</option>';
    });
    $('#select-agency').html(optionHtml);
    $('select#select-agency').on('change', function (ev) {
        agencyProgress = 25;
        setProgress();
        knownAgencies.some(function(val, indx, array) {
            if (val.id === ev.currentTarget.value) {
                agency = val;
                updateAvailableElas();
                return true;
            }
        });
    });
    $('#digsvc-quantity').on('change', function (ev) {
        unitsProgress = 25;
        setProgress();
        units = ev.currentTarget.value;
        updateAvailableElas();
    });
    $('input[name="ignore-minimums"]').on('click', function(ev) {
        if (ev.currentTarget.id === 'ignore-mins-yes') {
            ignoreUnitsProgress = 25;
            setProgress();
            ignoreMinimums = true;
            updateAvailableElas();
        }
        else {
            ignoreUnitsProgress = 0;
            setProgress();
            ignoreMinimums = false;
            updateAvailableElas();
        }
    });

});
