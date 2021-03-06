/*!
 * ${copyright}
 */

// Provides object sap.ui.core.sample.ViewTemplate.scenario.FieldHelper
//TODO is this a SAPUI5 module or how to provide this static formatter?
sap.ui.define(['jquery.sap.global'],
	function(jQuery) {
		'use strict';

		/**
		 * Copied from AnnotationHelper. TODO Make API.
		 */
		function getProperty(sPath, oBinding) {
			var oModel = oBinding.getModel(),
				sResolvedPath // resolved binding path (not relative anymore!)
					= oModel.resolve(oBinding.getPath(), oBinding.getContext()),
					aParts = sResolvedPath.split("/"), // parts of binding path (between slashes)
					aProperties,
					oProperty = undefined,
					sType;

			if (aParts[0] === "" && aParts[1] === "dataServices" && aParts[2] === "schema") {
				// go up to "/dataServices/schema/<i>/entityType/<j>/"
				aParts.splice(6, aParts.length - 6);
				aParts.push("property");
				aProperties = oModel.getProperty(aParts.join("/"));

				jQuery.each(aProperties, function (i, oProperty0) {
					if (oProperty0.name === sPath) {
						oProperty = oProperty0;
						return false; //break
					}
				});
			}
			return oProperty;
		}

		function getPropertyAnnotation(sPath, oBinding, sAnnotationName) {
			var oProperty = getProperty(sPath, oBinding);

			return oProperty && oProperty[sAnnotationName];
		}

		function isSemantics(oControl, vRawValue, sExpectedSemantics) {
			if (vRawValue && vRawValue.hasOwnProperty("Path")) {
				return sExpectedSemantics === getPropertyAnnotation(vRawValue.Path,
					oControl.currentBinding(), "sap:semantics");
			}
		}

		/**
		 * The Field helper which can act as a formatter in XML template views.
		 *
		 * @alias sap.ui.core.sample.ViewTemplate.scenario.FieldHelper
		 * @private
		 */
		return {
			isSemanticsEmail: function (vRawValue) {
				return isSemantics(this, vRawValue, "email");
			},
			isSemanticsTel: function (vRawValue) {
				return isSemantics(this, vRawValue, "tel");
			}
		};
	}, /* bExport= */ true);
