(() => {
  var e = {
      785: (e) => {
        var t = {
          displayMode: "",
          collectionProps: [],
          itemsProps: [],
          enabledFaqStyle: 0,
          init: function (e) {
            (this.itemsProps = e.items),
              (this.collectionProps = e.collection),
              (this.displayMode = this.collectionProps.display_mode),
              (this.enabledFaqStyles = this.collectionProps.enable_faq_styles);
          },
          getAccordions: function () {
            for (var e = "", t = 0; t < this.itemsProps.length; t++)
              0 != this.itemsProps[t].length &&
                (e += this.getAccordion(this.itemsProps[t]));
            return e;
          },
          getAccordion: function (e) {
            var t = this,
              n = e.post_id ? "post-" + e.post_id : "terms-" + e.term_id,
              o = e.post_id ? "title_icon" : "category_title_icon",
              r = t.getAccordionStyles(),
              i = t.getUrlAttribute(e),
              s = t.getTitleIcon(o),
              a = t.getCustomToggleIcon(),
              c = "",
              u = "",
              l = s + e.title,
              d = "";
            return (
              "open_all_faqs" == this.collectionProps.open_by_default &&
                ((u += " active"), (c += "display:block;")),
              "" != a && (u += " custom-icon"),
              "left" == this.collectionProps.icon_position &&
                "1" == this.enabledFaqStyles &&
                "faq_list" != this.displayMode &&
                (u += " accordion__icon__position--ltr"),
              (c += r.body_background),
              (d += '<li class="accordion__item">'),
              (d +=
                '<div class="accordion__header ' +
                u +
                '" data-id="' +
                n +
                '" data-item="' +
                i +
                '" data-tags="' +
                e.tags +
                '" style="' +
                r.header_background +
                '">'),
              (d += t.getAccordionHeaderContentByTag(l)),
              (d += a),
              (d += "</div>"),
              (d += '<div class="accordion__body" style="' + c + '">'),
              (d += e.content),
              (d += "</div>") + "</li>"
            );
          },
          getUrlAttribute: function (e) {
            if ("1" != this.collectionProps.faq_url_attribute) return "";
            var t = e.post_id ? "post-" + e.post_id : "terms-" + e.term_id;
            return "post_slug" == this.collectionProps.faq_url_type &&
              "premium" === helpie_faq_object.plan
              ? e.slug.toLowerCase().replace(" ", "-")
              : "hfaq-" + t;
          },
          getTitleIcon: function (e) {
            var t = "",
              n =
                "title_icon" == e
                  ? this.collectionProps.title_icon
                  : this.collectionProps.category_title_icon;
            return "" == n || "1" != this.enabledFaqStyles
              ? t
              : (t =
                  '<span class="accordion__title-icon"><i class="faq-title-icon ' +
                  n +
                  '"></i></span>');
          },
          getCustomToggleIcon: function () {
            var e = "";
            if ("faq_list" == this.displayMode || "1" != this.enabledFaqStyles)
              return e;
            var t =
              "open_all_faqs" == this.collectionProps.open_by_default
                ? " open-all"
                : "";
            return (
              "custom" === this.collectionProps.toggle_icon_type &&
                "" != this.collectionProps.toggle_open &&
                "" != this.collectionProps.toggle_off &&
                ((e = '<span class="accordion__toggle ' + t + '">'),
                (e +=
                  '<span class="accordion__toggle--open"><i class="accordion__toggle-icons ' +
                  this.collectionProps.toggle_open +
                  '"></i></span>'),
                (e +=
                  '<span class="accordion__toggle--close"><i class="accordion__toggle-icons ' +
                  this.collectionProps.toggle_off +
                  '"></i></span>'),
                (e += "</span>")),
              e
            );
          },
          getAccordionStyles: function () {
            var e = "",
              t = "";
            return (
              "" != this.collectionProps.accordion_background &&
                ((e =
                  "background:" +
                  this.collectionProps.accordion_background.header),
                (t =
                  "background:" +
                  this.collectionProps.accordion_background.body)),
              { header_background: e, body_background: t }
            );
          },
          getAccordionHeaderTag: function () {
            var e = this.getAllowedHeaderTags(),
              t =
                "" != this.collectionProps.accordion_header_tag
                  ? this.collectionProps.accordion_header_tag
                  : "default";
            return e[t] &&
              "premium" === helpie_faq_object.plan &&
              "1" == this.enabledFaqStyles &&
              "default" != t &&
              "p" != t
              ? t
              : "div";
          },
          getAllowedHeaderTags: function () {
            return {
              h1: "Heading 1",
              h2: "Heading 2",
              h3: "Heading 3",
              h4: "Heading 4",
              h5: "Heading 5",
              h6: "Heading 6",
              p: "Paragraph",
            };
          },
          getAccordionHeaderContentByTag: function (e) {
            var t = this.getAccordionHeaderTag(),
              n = "";
            return (
              (n += "<" + t + " class='accordion__title'>"),
              (n += e) + "</" + t + ">"
            );
          },
        };
        e.exports = t;
      },
      410: (e) => {
        var t = {
          getFaqs: function (e) {
            var t = this.getCurrentShortcodeViewProps(e.shortcodeIndex);
            return this.getCurrentPageViewProps(e, t);
          },
          getCurrentShortcodeViewProps: function (e) {
            return window.HELPIE_FAQS[e];
          },
          getCurrentPageViewProps: function (e, t) {
            var n = t.collection.limit,
              o = parseInt(e.page) * parseInt(n),
              r = parseInt(o) + parseInt(n),
              i = t.items;
            return (
              (t.collection.total_no_of_pages = this.getTotalNoOfPages(t)),
              (slicedItems = i.slice(o, r)),
              { collection: t.collection, items: slicedItems }
            );
          },
          getTotalNoOfPages: function (e) {
            var t = e.items.length,
              n = e.collection.limit,
              o = Math.ceil(parseInt(t) / parseInt(n));
            return o > 1 ? o - 1 : 0;
          },
        };
        e.exports = t;
      },
      727: (e, t, n) => {
        var o = n(785),
          r = {
            getElements: function (e) {
              var t = jQuery(e).closest(".helpie-faq"),
                n = t.find(".accordion"),
                o = t.find(".helpie-faq__pagination");
              return {
                root: t,
                pagination: o,
                current: jQuery(e),
                accordion: n,
              };
            },
            getShortcodeIndex: function (e) {
              var t = jQuery(e.root).attr("data-shortcode-index");
              return parseInt(t);
            },
            getCollectionPropsFromHtml: function (e) {
              var t = jQuery(e.root).attr("data-collection"),
                n = {};
              return (
                void 0 !== t &&
                  "undefined" !== t &&
                  "" != t &&
                  (n = JSON.parse(t)),
                n
              );
            },
            getPaginationCurrentPage: function (e) {
              var t = jQuery(e.root).attr("data-pagination");
              return null == t ? 0 : parseInt(t);
            },
            paginationEnabled: function (e) {
              return this.getElements(e).pagination.length > 0 ? "1" : "0";
            },
            searchTermFromFaqObject: function (e, t) {
              var n = this,
                o = [];
              return (
                e.forEach(function (e, r) {
                  var i = n.isTitleMatch(e, t),
                    s = n.isContentMatch(e, t),
                    a = n.searchByTags(e, t);
                  (i || s || a) && o.push(e);
                }),
                o
              );
            },
            isTitleMatch: function (e, t) {
              return !(e.title.toLowerCase().search(t) < 0);
            },
            isContentMatch: function (e, t) {
              var n = e.content.replace(/<[^>]+>/g, "");
              return !((n = n.toLowerCase()).search(t) < 0);
            },
            searchByTags: function (e, t) {
              var n = !1;
              return (
                null == e.tags ||
                  "undefined" == e.tags ||
                  0 == e.tags.length ||
                  e.tags.split(",").forEach(function (e) {
                    -1 != (e = e.toLowerCase()).search(t) && (n = !0);
                  }),
                n
              );
            },
            appendFaqsContent: function (e, t) {
              var n = this,
                o = n.getFaqsContent(t);
              jQuery(e.accordion)
                .removeClass("accordion--hide")
                .empty()
                .append(o),
                n.setSearchAttributes(e),
                n.moveToTop(e);
            },
            getFaqsContent: function (e) {
              return o.init(e), o.getAccordions();
            },
            setSearchAttributes: function (e) {
              jQuery(e.root)
                .find(".accordion__item")
                .each(function () {
                  var e = jQuery(this).text().toLowerCase();
                  jQuery(this).attr("data-search-term", e);
                });
            },
            moveToTop: function (e) {
              var t = jQuery(e.accordion).offset().top;
              (t = parseInt(t) - parseInt(70)),
                window.scrollTo({ top: t, behavior: "smooth" });
            },
          };
        e.exports = r;
      },
      613: (e, t, n) => {
        var o = n(410),
          r = n(29),
          i = n(785),
          s = n(727),
          a = {
            init: function (e, t) {
              var n = s.getElements(e),
                a = s.getShortcodeIndex(n),
                c = o.getCurrentShortcodeViewProps(a),
                u = s.searchTermFromFaqObject(c.items, t),
                l = o.getTotalNoOfPages({ collection: c.collection, items: u }),
                d = jQuery(n.pagination)
                  .find(
                    ".helpie-faq__pagination__listItem .helpie-faq__pagination__listItem--anchor.active"
                  )
                  .attr("data-page"),
                f = {
                  page: (d = null == d ? 0 : parseInt(d)),
                  shortcodeIndex: a,
                },
                p = o.getCurrentPageViewProps(f, {
                  collection: c.collection,
                  items: u,
                });
              i.init({ collection: c.collection, items: p.items });
              var h = i.getAccordions();
              return (
                jQuery(n.accordion)
                  .removeClass("accordion--hide")
                  .empty()
                  .append(h),
                r.renderPageLinks(n.pagination, { current: f.page, last: l }),
                t
              );
            },
          };
        e.exports = a;
      },
      29: (e, t, n) => {
        var o = n(410),
          r = n(727),
          i = ".helpie-faq__pagination",
          s =
            ".helpie-faq__pagination__listItem .helpie-faq__pagination__listItem--anchor",
          a = {
            init: function () {
              this.events();
            },
            events: function () {
              var e = this;
              jQuery(i).on("click", s, function () {
                e.loadFAQs(this);
              });
            },
            loadFAQs: function (e) {
              var t = this,
                n = jQuery(e).attr("data-page"),
                o = t.getTotalNoOfPage(e),
                i = t.getCurrentPage(e);
              if (n instanceof String || "string" == typeof n)
                if ("PREV" == n) {
                  if (0 == i) return !1;
                  n = parseInt(i) - 1;
                } else if ("NEXT" == n) {
                  if (parseInt(i) === parseInt(o)) return !1;
                  n = parseInt(i) + 1;
                }
              var s = r.getElements(e),
                a = r.getCollectionPropsFromHtml(s);
              (a.search_term = t.getSearchValue(s)),
                (a.page = n),
                t.setFAQs(a, s),
                0 == jQuery(s.root).attr("data-search") &&
                  jQuery(s.root).attr("data-pagination", n);
            },
            setFAQs: function (e, t) {
              var n = r.getShortcodeIndex(t);
              e.shortcodeIndex = n;
              var i = o.getCurrentShortcodeViewProps(n),
                s = i.items,
                a = o.getTotalNoOfPages(i);
              if (
                "" != e.search_term &&
                null != e.search_term &&
                "undefined" != e.search_term
              ) {
                var c = r.searchTermFromFaqObject(s, e.search_term);
                (a = o.getTotalNoOfPages({
                  collection: i.collection,
                  items: c,
                })),
                  (s = c);
              }
              var u = o.getCurrentPageViewProps(e, {
                collection: i.collection,
                items: s,
              });
              r.appendFaqsContent(t, u),
                this.renderPageLinks(t.pagination, {
                  current: e.page,
                  last: a,
                });
            },
            loader: function (e, t) {
              var n = 1 == t ? "active" : "",
                o = 0 == t ? "active" : "";
              jQuery(e)
                .closest(i)
                .find(".helpie-faq__spinner")
                .removeClass(o)
                .addClass(n);
            },
            getCurrentPage: function (e) {
              var t = jQuery(e)
                .closest(i)
                .find(s + ".active")
                .attr("data-page");
              return null == t ? 0 : parseInt(t);
            },
            getTotalNoOfPage: function (e) {
              var t = jQuery(e).closest(i).find(s).last().attr("data-page");
              return parseInt(t);
            },
            renderPageLinks: function (e, t) {
              var n = this,
                o = "";
              (o += n.getPageLink({ page: 0, label: "First" })),
                (o += n.getPageLink({ page: "PREV", label: "Previous" })),
                (o += n.getPagesLinks(t.last, t.current)),
                (o += n.getPageLink({ page: "NEXT", label: "Next" })),
                (o += n.getPageLink({ page: t.last, label: "Last" })),
                jQuery(e)
                  .removeClass("helpie-faq__pagination--hide")
                  .find(".helpie-faq__pagination__list")
                  .empty()
                  .append(o);
            },
            getPagesLinks: function (e, t) {
              var n = [-2, -1, 0, 1, 2],
                o = "";
              for (buttonItr = 0; buttonItr < n.length; buttonItr++) {
                var r = n[buttonItr],
                  i = parseInt(t) + parseInt(r),
                  s = i == t ? "active" : "";
                i >= 0 &&
                  i <= e &&
                  (o += this.getPageLink({
                    classes: s,
                    page: i,
                    label: parseInt(i) + 1,
                  }));
              }
              return o;
            },
            getPageLink: function (e) {
              var t = "";
              return (
                (t += '<li class="helpie-faq__pagination__listItem">'),
                (t +=
                  '<a class="helpie-faq__pagination__listItem--anchor ' +
                  (void 0 === e.classes ? "" : e.classes) +
                  ' " data-page="' +
                  e.page +
                  '">' +
                  e.label +
                  "</a>") + "</li>"
              );
            },
            getSearchValue: function (e) {
              var t = jQuery(e.root).find(".search__input");
              return 0 == t.length
                ? ""
                : t
                    .val()
                    .toLowerCase()
                    .replace(/[.*+?^${}()|[\]\\]/gi, "");
            },
          };
        e.exports = a;
      },
      753: (e, t, n) => {
        var o = n(410),
          r = n(727),
          i = n(29),
          s = {
            urlAttribute: "",
            doSearch: function (e) {
              var t = this;
              (t.urlAttribute = e),
                jQuery(".helpie-faq").each(function () {
                  if ("1" === jQuery(this).attr("data-pagination-enabled")) {
                    var e = jQuery(this).attr("data-shortcode-index"),
                      n = o.getCurrentShortcodeViewProps(e),
                      i = r.getElements(this);
                    t.searchByUrlAttribute(n, i);
                  }
                });
            },
            searchByUrlAttribute: function (e, t) {
              var n = this,
                s = e.items,
                a = n.urlAttribute.search("hfaq") < 0,
                c = 0;
              s.forEach(function (e, t) {
                var o = e.slug;
                a || (o = "hfaq-post-" + e.post_id),
                  (o = "#" + o),
                  n.urlAttribute == o && (c = t);
              });
              var u = o.getTotalNoOfPages(e),
                l = { totalNoOfPage: u, accordionIndex: c },
                d = n.getPageNumber(e, l);
              if (((l.page = d), d > 0)) {
                var f = o.getCurrentPageViewProps(l, e);
                r.appendFaqsContent(t, f),
                  i.renderPageLinks(t.pagination, { current: d, last: u });
              }
            },
            getPageNumber: function (e, t) {
              for (
                var n = e.collection.limit, o = 0, r = 0;
                r <= t.totalNoOfPage;
                r++
              ) {
                var i = parseInt(r) * parseInt(n),
                  s = parseInt(i) + parseInt(n);
                t.accordionIndex >= i && t.accordionIndex <= s && (o = r);
              }
              return o;
            },
          };
        e.exports = s;
      },
      607: (e) => {
        var t = {
          init: function () {
            this.nonce = helpie_faq_object.nonce;
          },
          searchCounter: function (e) {
            var t = {
              action: "helpie_faq_search_counter",
              nonce: this.nonce,
              searchTerm: e,
            };
            this.makeRequest(t);
          },
          clickCounter: function (e) {
            var t = {
              action: "helpie_faq_click_counter",
              nonce: this.nonce,
              id: e,
            };
            this.makeRequest(t);
          },
          detectWidgets: function () {
            var e = jQuery(".elementor-widget-helpie-faq").length,
              t = jQuery(".elementor-widget-helpie-faq-dynamic-add").length,
              n = {
                action: "helpie_faq_track_shortcodes_and_widgets",
                nonce: this.nonce,
                event_value: "",
                event_name: "",
              };
            e &&
              ((n.event_value = "helpie_faq"),
              (n.event_name = "Elementor Widget"),
              this.makeRequest(n)),
              t &&
                ((n.event_value = "helpie_faq_dynamic_add"),
                (n.event_name = "Elementor Widget"),
                this.makeRequest(n));
          },
          makeRequest: function (e) {
            jQuery.post(helpie_faq_object.ajax_url, e, function (e) {});
          },
        };
        e.exports = t;
      },
      669: (e, t, n) => {
        var o = n(460),
          r = {
            init: function () {
              if ("" == helpie_faq_object.enabled_submission) return !1;
              this.eventHandler();
            },
            eventHandler: function () {
              this.initChosen(),
                this.toggleForm(),
                this.submitForm(),
                "premium" == helpie_faq_object.plan && o.getLoggedEmail();
            },
            initChosen: function () {
              jQuery(".helpie-faq")
                .find(".form__section .faq_categories")
                .each(function () {
                  jQuery(this).chosen({ width: "100%" });
                });
            },
            submitForm: function () {
              var e = this;
              jQuery(".helpie-faq").on("click", ".form__submit", function (t) {
                t.stopPropagation();
                var n = jQuery(this).closest(".form__section"),
                  r = n.find(".form__text").val(),
                  i = n.find(".form__email").val(),
                  s = n.find(".form__textarea").val(),
                  a = n.data("woo-product"),
                  c = n.data("kb-category"),
                  u = n.find(".faq_categories").val(),
                  l = n.find("input[name=faq_group_id]").val(),
                  d = {
                    action: "helpie_faq_submission",
                    nonce: e.nonce,
                    question: r,
                    categories: u,
                    group_id: l,
                  };
                i && (d.email = i),
                  s && (d.answer = s),
                  a && (d.woo_product = a),
                  c && (d.kb_category = c),
                  ((r && e._isEmail(i)) || (r && null == i)) &&
                    (t.preventDefault(), o.postForm(d, n));
              });
            },
            toggleForm: function () {
              jQuery(".helpie-faq").on("click", ".form__toggle", function (e) {
                e.preventDefault(), e.stopPropagation();
                var t = jQuery(this).parent().next(".form__section"),
                  n = this.value,
                  o = "";
                t.next().hide(),
                  n === faqStrings.addFAQ
                    ? ((o = faqStrings.hide), t.show())
                    : ((o = faqStrings.addFAQ), t.hide()),
                  (this.value = o);
              });
            },
            _isEmail: function (e) {
              return !!/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
                e
              );
            },
          };
        e.exports = r;
      },
      460: (e) => {
        var t = {
          postForm: function (e, t) {
            (thisModule = this),
              jQuery.post(helpie_faq_object.ajax_url, e, function (e) {
                var n = JSON.parse(e);
                "publish" == n.postStatus
                  ? (thisModule._successMessage(t),
                    setTimeout(function () {
                      location.reload();
                    }, 1e3))
                  : "pending" == n.postStatus && thisModule._successMessage(t);
              });
            var n = t.find(".faq_default_category_term_id").val();
            t.find(".form__text").val(""),
              t.find(".form__email").val(""),
              t.find(".form__textarea").val(""),
              t.find(".faq_categories").val(n).trigger("chosen:updated"),
              "premium" == helpie_faq_object.plan &&
                thisModule.getLoggedEmail();
          },
          getLoggedEmail: function () {
            thisModule = this;
            var e = {
                action: "helpie_faq_submission_get_logged_email",
                nonce: thisModule.nonce,
              },
              t = jQuery(".form__section .form__email");
            t &&
              jQuery.get(helpie_faq_object.ajax_url, e, function (e) {
                var n = JSON.parse(e);
                n.loggedEmail && t.val(n.loggedEmail);
              });
          },
          _appendItem: function (e, t) {
            var n = t.parent().find(".accordion"),
              o = {
                action: "helpie_faq_submission_get_item",
                nonce: thisModule.nonce,
                title: e.question,
              };
            (o.content = e.answer ? e.answer : "Empty Content"),
              jQuery.post(helpie_faq_object.ajax_url, o, function (e) {
                var t = JSON.parse(e);
                n.append(t.singleItem);
              });
          },
          _successMessage: function (e) {
            jQuery(e).hide(),
              jQuery(e).next().show(),
              jQuery(e).next().addClass("active");
          },
        };
        e.exports = t;
      },
      992: (e, t, n) => {
        var o = n(607),
          r = n(613),
          i = n(727),
          s = n(410),
          a = n(29),
          c = n(813),
          u =
            (n(755).error,
            {
              accordions: ".helpie-faq.accordions",
              faqSearch: ".helpie-faq .search__wrapper .search__input",
              accordion: ".accordion",
              accordionShow: "accordion--show",
              accordionHide: "accordion--hide",
              accordionHeading: ".accordion__heading",
              accordionHeadingShow: "accordion__heading--show",
              accordionHeadingHide: "accordion__heading--hide",
              accordionHeader: ".accordion .accordion__item .accordion__header",
              accordionItem: ".accordion__item",
              accordionItemShow: "accordion__item--show",
              accordionItemHide: "accordion__item--hide",
              accordionBody: ".accordion__body",
              searchMessage: ".search .search__message",
              searchMessageContent:
                "<p class='search__message__content'>" +
                faqStrings.noFaqsFound +
                "</p>",
            }),
          l = {
            searchTerm: "",
            typingTimer: 0,
            doneTypingInterval: 2e3,
            paginationEnabled: "0",
            highlightEnabled:
              !!helpie_faq_object.enable_search_highlight &&
              helpie_faq_object.enable_search_highlight,
            setSearchAttr: function () {
              jQuery(u.accordionHeader).each(function () {
                var e = jQuery(this).text().toLowerCase();
                jQuery(this).attr("data-search-term", e);
              });
            },
            showAllMatchedContent: function (e) {
              1 == this.highlightEnabled && e.addClass("faq-search-matched");
            },
            resetShowingContent: function () {
              jQuery(".accordions .accordion__body").removeClass(
                "faq-search-matched"
              );
            },
            isContentMatch: function (e, t) {
              var n = jQuery(e).find(u.accordionBody),
                o = n.text().toLowerCase();
              return this.showAllMatchedContent(n), o.indexOf(t) >= 0;
            },
            resetHighlight: function () {
              new c(document.querySelector(".accordion")).unmark();
            },
            highlightText: function (e, t) {
              if (0 != this.highlightEnabled) {
                var n = new c(e);
                n.unmark({
                  done: function () {
                    n.mark(t, {});
                  },
                });
              }
            },
            isTitleMatch: function (e, t) {
              var n = jQuery(e)
                .find(".accordion__header")
                .attr("data-search-term");
              return null != n && "undefined" != n && n.search(t) >= 0;
            },
            isCategoryHeadingMatch: function (e, t) {
              return (
                jQuery(e)
                  .prev(u.accordionHeading)
                  .text()
                  .toLowerCase()
                  .indexOf(t) >= 0
              );
            },
            isCategroryAccordionMatch: function (e, t) {
              return (
                0 != jQuery(e).hasClass("accordion__category") &&
                this.isTitleMatch(e, t)
              );
            },
            searchByAccordionItem: function (e, t) {
              var n = this;
              searchTerm = n.searchTerm;
              var o = n.isTitleMatch(e, searchTerm),
                r = n.isContentMatch(e, searchTerm),
                i = n.searchByTags(e, searchTerm),
                s = !!(o || r || i);
              return n.displayAccordionItem(e, s), s;
            },
            onSearchKeyup: function (e) {
              var t = this,
                n = t.searchTerm;
              jQuery(e)
                .closest(u.accordions)
                .children(u.accordion)
                .each(function () {
                  var e = jQuery(this),
                    o = !1,
                    r = t.isCategoryHeadingMatch(e, n),
                    i = e.get(0);
                  t.highlightText(i, n),
                    1 == r
                      ? ((o = !0), t.showAccordionSection(e, o))
                      : e
                          .find(".helpie-faq-col")
                          .children(u.accordionItem)
                          .each(function () {
                            $accordionItem = jQuery(this);
                            var e = $accordionItem.hasClass(
                                "accordion__category"
                              ),
                              r = t.searchByCategory($accordionItem, n),
                              i = !(!e || !r),
                              s = 0 == i,
                              a = !1;
                            s &&
                              (a = t.searchInnerAccordionsItems(
                                $accordionItem,
                                n
                              ));
                            var c = 0 == e,
                              u = !1;
                            c &&
                              (u = t.searchByAccordionItem($accordionItem, {})),
                              e &&
                                0 == a &&
                                t.showCategoryWithAccordions($accordionItem, i),
                              s &&
                                a &&
                                t.showAccordionBelongsToCategory(
                                  $accordionItem,
                                  !0
                                ),
                              0 == o &&
                                (1 == i && (o = !0),
                                1 == s && 1 == a && (o = !0),
                                1 == c && 1 == u && (o = !0));
                          }),
                    t.displayHeading(e, o),
                    t.showAccordion(e, o);
                });
            },
            searchByCategory: function (e, t) {
              return this.isCategroryAccordionMatch(e, t);
            },
            searchInnerAccordionsItems: function (e, t) {
              var n = this,
                o = !1;
              return (
                e.find(u.accordionItem).each(function () {
                  ($item = jQuery(this)),
                    1 == n.searchByAccordionItem($item, {}) && (o = !0);
                }),
                o
              );
            },
            init: function () {
              var e = this;
              e.setSearchAttr(),
                jQuery("body").on("keyup", u.faqSearch, function (t) {
                  var n = jQuery(this)
                    .val()
                    .toLowerCase()
                    .replace(/[*+?^${}()|[\]\\]/gi, "");
                  e.searchTerm = n;
                  var s = i.getElements(this);
                  return (
                    (e.paginationEnabled = i.paginationEnabled(this)),
                    e.canSeeEmptyFAQsBlock(this, "hide"),
                    "" == e.searchTerm && "1" == e.paginationEnabled
                      ? (jQuery(s.root).attr("data-search", "0"),
                        e.showAllAccordionsFromObject(this),
                        !1)
                      : "" == e.searchTerm && "1" != e.paginationEnabled
                      ? (e.showAllAccordions(this),
                        e.resetHighlight(this),
                        e.resetShowingContent(this),
                        !1)
                      : ("1" == e.paginationEnabled
                          ? (jQuery(s.root).attr("data-search", "1"),
                            r.init(this, n))
                          : e.onSearchKeyup(this),
                        e.showEmptyFAQsContent(this),
                        "" != e.searchTerm &&
                          (clearTimeout(e.typingTimer),
                          void (e.typingTimer = setTimeout(function () {
                            o.searchCounter(e.searchTerm);
                          }, e.doneTypingInterval))))
                  );
                });
            },
            showAllAccordions: function (e) {
              var t = this;
              jQuery(e)
                .closest(u.accordions)
                .children(u.accordion)
                .each(function () {
                  var e = jQuery(this);
                  t.showAccordion(e, !0),
                    t.displayHeading(e, !0),
                    e
                      .find(u.accordion)
                      .removeClass(u.accordionHide)
                      .addClass(u.accordionShow),
                    e
                      .find(u.accordionItem)
                      .removeClass(u.accordionItemHide)
                      .addClass(u.accordionItemShow);
                });
            },
            showEmptyFAQsContent: function (e) {
              var t = this,
                n = 0,
                o = jQuery(e)
                  .closest(u.accordions)
                  .find(u.accordionItem).length;
              jQuery(e)
                .closest(u.accordions)
                .find(u.accordionItem)
                .each(function () {
                  0 == jQuery(this).is(":visible") && (n = parseInt(n) + 1);
                }),
                n == o &&
                  (jQuery(e)
                    .closest(u.accordions)
                    .find(u.accordion)
                    .each(function () {
                      var e = jQuery(this);
                      t.displayHeading(e, !1), t.showAccordion(e, !1);
                    }),
                  jQuery(e)
                    .closest(u.accordions)
                    .find(u.searchMessage)
                    .empty()
                    .show()
                    .append(u.searchMessageContent));
            },
            canSeeEmptyFAQsBlock: function (e, t) {
              var n = "none";
              "show" == t && (n = "block"),
                jQuery(e)
                  .closest(u.accordions)
                  .find(u.searchMessage)
                  .css("display", n);
            },
            displayAccordionItem: function (e, t) {
              var n = 1 == t ? u.accordionItemShow : u.accordionItemHide,
                o = 0 == t ? u.accordionItemShow : u.accordionItemHide;
              e.removeClass(o).addClass(n);
            },
            displayHeading: function (e, t) {
              var n = 1 == t ? u.accordionHeadingShow : u.accordionHeadingHide,
                o = 0 == t ? u.accordionHeadingShow : u.accordionHeadingHide;
              e.prev(u.accordionHeading).removeClass(o).addClass(n);
            },
            showCategoryAccordions: function (e, t) {
              var n = 1 == t ? u.accordionItemShow : u.accordionItemHide,
                o = 0 == t ? u.accordionItemShow : u.accordionItemHide;
              jQuery(e).find(u.accordionItem).removeClass(o).addClass(n);
            },
            showAccordionSection: function (e, t) {
              var n = this;
              n.displayHeading(e, t),
                n.showCategoryAccordions(e, t),
                n.showAccordion(e, t);
            },
            showAccordion: function (e, t) {
              var n = 1 == t ? u.accordionShow : u.accordionHide,
                o = 0 == t ? u.accordionShow : u.accordionHide;
              jQuery(e).removeClass(o).addClass(n);
            },
            showCategoryWithAccordions: function (e, t) {
              var n = this;
              n.displayAccordionItem(e, t),
                n.showCategoryAccordions(e, t),
                n.showAccordion(e, t);
            },
            showAccordionBelongsToCategory: function (e, t) {
              jQuery(e)
                .find(u.accordion)
                .removeClass(u.accordionHide)
                .addClass(u.accordionShow),
                this.displayAccordionItem(e, t);
            },
            searchByTags: function (e, t) {
              var n = jQuery(e).find(".accordion__header").attr("data-tags"),
                o = !1;
              return (
                null == n ||
                  "undefined" == n ||
                  0 == n.length ||
                  n.split(",").forEach(function (e) {
                    -1 != (e = e.toLowerCase()).search(t) && (o = !0);
                  }),
                o
              );
            },
            showAllAccordionsFromObject: function (e) {
              var t = i.getElements(e),
                n = i.getPaginationCurrentPage(t),
                o = i.getShortcodeIndex(t),
                r = { page: n },
                c = s.getCurrentShortcodeViewProps(o),
                u = s.getTotalNoOfPages(c),
                l = s.getCurrentPageViewProps(r, {
                  collection: c.collection,
                  items: c.items,
                });
              i.appendFaqsContent(t, l),
                a.renderPageLinks(t.pagination, { current: n, last: u });
            },
          };
        e.exports = l;
      },
      755: function (e, t) {
        var n;
        !(function (t, n) {
          "use strict";
          "object" == typeof e.exports
            ? (e.exports = t.document
                ? n(t, !0)
                : function (e) {
                    if (!e.document)
                      throw new Error(
                        "jQuery requires a window with a document"
                      );
                    return n(e);
                  })
            : n(t);
        })("undefined" != typeof window ? window : this, function (o, r) {
          "use strict";
          var i = [],
            s = Object.getPrototypeOf,
            a = i.slice,
            c = i.flat
              ? function (e) {
                  return i.flat.call(e);
                }
              : function (e) {
                  return i.concat.apply([], e);
                },
            u = i.push,
            l = i.indexOf,
            d = {},
            f = d.toString,
            p = d.hasOwnProperty,
            h = p.toString,
            g = h.call(Object),
            m = {},
            v = function (e) {
              return (
                "function" == typeof e &&
                "number" != typeof e.nodeType &&
                "function" != typeof e.item
              );
            },
            y = function (e) {
              return null != e && e === e.window;
            },
            b = o.document,
            w = { type: !0, src: !0, nonce: !0, noModule: !0 };
          function x(e, t, n) {
            var o,
              r,
              i = (n = n || b).createElement("script");
            if (((i.text = e), t))
              for (o in w)
                (r = t[o] || (t.getAttribute && t.getAttribute(o))) &&
                  i.setAttribute(o, r);
            n.head.appendChild(i).parentNode.removeChild(i);
          }
          function _(e) {
            return null == e
              ? e + ""
              : "object" == typeof e || "function" == typeof e
              ? d[f.call(e)] || "object"
              : typeof e;
          }
          var k = "3.7.1",
            S = /HTML$/i,
            $ = function (e, t) {
              return new $.fn.init(e, t);
            };
          function E(e) {
            var t = !!e && "length" in e && e.length,
              n = _(e);
            return (
              !v(e) &&
              !y(e) &&
              ("array" === n ||
                0 === t ||
                ("number" == typeof t && t > 0 && t - 1 in e))
            );
          }
          function T(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
          }
          ($.fn = $.prototype =
            {
              jquery: k,
              constructor: $,
              length: 0,
              toArray: function () {
                return a.call(this);
              },
              get: function (e) {
                return null == e
                  ? a.call(this)
                  : e < 0
                  ? this[e + this.length]
                  : this[e];
              },
              pushStack: function (e) {
                var t = $.merge(this.constructor(), e);
                return (t.prevObject = this), t;
              },
              each: function (e) {
                return $.each(this, e);
              },
              map: function (e) {
                return this.pushStack(
                  $.map(this, function (t, n) {
                    return e.call(t, n, t);
                  })
                );
              },
              slice: function () {
                return this.pushStack(a.apply(this, arguments));
              },
              first: function () {
                return this.eq(0);
              },
              last: function () {
                return this.eq(-1);
              },
              even: function () {
                return this.pushStack(
                  $.grep(this, function (e, t) {
                    return (t + 1) % 2;
                  })
                );
              },
              odd: function () {
                return this.pushStack(
                  $.grep(this, function (e, t) {
                    return t % 2;
                  })
                );
              },
              eq: function (e) {
                var t = this.length,
                  n = +e + (e < 0 ? t : 0);
                return this.pushStack(n >= 0 && n < t ? [this[n]] : []);
              },
              end: function () {
                return this.prevObject || this.constructor();
              },
              push: u,
              sort: i.sort,
              splice: i.splice,
            }),
            ($.extend = $.fn.extend =
              function () {
                var e,
                  t,
                  n,
                  o,
                  r,
                  i,
                  s = arguments[0] || {},
                  a = 1,
                  c = arguments.length,
                  u = !1;
                for (
                  "boolean" == typeof s &&
                    ((u = s), (s = arguments[a] || {}), a++),
                    "object" == typeof s || v(s) || (s = {}),
                    a === c && ((s = this), a--);
                  a < c;
                  a++
                )
                  if (null != (e = arguments[a]))
                    for (t in e)
                      (o = e[t]),
                        "__proto__" !== t &&
                          s !== o &&
                          (u &&
                          o &&
                          ($.isPlainObject(o) || (r = Array.isArray(o)))
                            ? ((n = s[t]),
                              (i =
                                r && !Array.isArray(n)
                                  ? []
                                  : r || $.isPlainObject(n)
                                  ? n
                                  : {}),
                              (r = !1),
                              (s[t] = $.extend(u, i, o)))
                            : void 0 !== o && (s[t] = o));
                return s;
              }),
            $.extend({
              expando: "jQuery" + (k + Math.random()).replace(/\D/g, ""),
              isReady: !0,
              error: function (e) {
                throw new Error(e);
              },
              noop: function () {},
              isPlainObject: function (e) {
                var t, n;
                return !(
                  !e ||
                  "[object Object]" !== f.call(e) ||
                  ((t = s(e)) &&
                    ("function" !=
                      typeof (n = p.call(t, "constructor") && t.constructor) ||
                      h.call(n) !== g))
                );
              },
              isEmptyObject: function (e) {
                var t;
                for (t in e) return !1;
                return !0;
              },
              globalEval: function (e, t, n) {
                x(e, { nonce: t && t.nonce }, n);
              },
              each: function (e, t) {
                var n,
                  o = 0;
                if (E(e))
                  for (
                    n = e.length;
                    o < n && !1 !== t.call(e[o], o, e[o]);
                    o++
                  );
                else for (o in e) if (!1 === t.call(e[o], o, e[o])) break;
                return e;
              },
              text: function (e) {
                var t,
                  n = "",
                  o = 0,
                  r = e.nodeType;
                if (!r) for (; (t = e[o++]); ) n += $.text(t);
                return 1 === r || 11 === r
                  ? e.textContent
                  : 9 === r
                  ? e.documentElement.textContent
                  : 3 === r || 4 === r
                  ? e.nodeValue
                  : n;
              },
              makeArray: function (e, t) {
                var n = t || [];
                return (
                  null != e &&
                    (E(Object(e))
                      ? $.merge(n, "string" == typeof e ? [e] : e)
                      : u.call(n, e)),
                  n
                );
              },
              inArray: function (e, t, n) {
                return null == t ? -1 : l.call(t, e, n);
              },
              isXMLDoc: function (e) {
                var t = e && e.namespaceURI,
                  n = e && (e.ownerDocument || e).documentElement;
                return !S.test(t || (n && n.nodeName) || "HTML");
              },
              merge: function (e, t) {
                for (var n = +t.length, o = 0, r = e.length; o < n; o++)
                  e[r++] = t[o];
                return (e.length = r), e;
              },
              grep: function (e, t, n) {
                for (var o = [], r = 0, i = e.length, s = !n; r < i; r++)
                  !t(e[r], r) !== s && o.push(e[r]);
                return o;
              },
              map: function (e, t, n) {
                var o,
                  r,
                  i = 0,
                  s = [];
                if (E(e))
                  for (o = e.length; i < o; i++)
                    null != (r = t(e[i], i, n)) && s.push(r);
                else for (i in e) null != (r = t(e[i], i, n)) && s.push(r);
                return c(s);
              },
              guid: 1,
              support: m,
            }),
            "function" == typeof Symbol &&
              ($.fn[Symbol.iterator] = i[Symbol.iterator]),
            $.each(
              "Boolean Number String Function Array Date RegExp Object Error Symbol".split(
                " "
              ),
              function (e, t) {
                d["[object " + t + "]"] = t.toLowerCase();
              }
            );
          var C = i.pop,
            j = i.sort,
            q = i.splice,
            A = "[\\x20\\t\\r\\n\\f]",
            P = new RegExp(
              "^" + A + "+|((?:^|[^\\\\])(?:\\\\.)*)" + A + "+$",
              "g"
            );
          $.contains = function (e, t) {
            var n = t && t.parentNode;
            return (
              e === n ||
              !(
                !n ||
                1 !== n.nodeType ||
                !(e.contains
                  ? e.contains(n)
                  : e.compareDocumentPosition &&
                    16 & e.compareDocumentPosition(n))
              )
            );
          };
          var I = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;
          function N(e, t) {
            return t
              ? "\0" === e
                ? "�"
                : e.slice(0, -1) +
                  "\\" +
                  e.charCodeAt(e.length - 1).toString(16) +
                  " "
              : "\\" + e;
          }
          $.escapeSelector = function (e) {
            return (e + "").replace(I, N);
          };
          var O = b,
            L = u;
          !(function () {
            var e,
              t,
              n,
              r,
              s,
              c,
              u,
              d,
              f,
              h,
              g = L,
              v = $.expando,
              y = 0,
              b = 0,
              w = ee(),
              x = ee(),
              _ = ee(),
              k = ee(),
              S = function (e, t) {
                return e === t && (s = !0), 0;
              },
              E =
                "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
              I =
                "(?:\\\\[\\da-fA-F]{1,6}" +
                A +
                "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",
              N =
                "\\[" +
                A +
                "*(" +
                I +
                ")(?:" +
                A +
                "*([*^$|!~]?=)" +
                A +
                "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" +
                I +
                "))|)" +
                A +
                "*\\]",
              M =
                ":(" +
                I +
                ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" +
                N +
                ")*)|.*)\\)|)",
              R = new RegExp(A + "+", "g"),
              D = new RegExp("^" + A + "*," + A + "*"),
              H = new RegExp("^" + A + "*([>+~]|" + A + ")" + A + "*"),
              F = new RegExp(A + "|>"),
              Q = new RegExp(M),
              B = new RegExp("^" + I + "$"),
              W = {
                ID: new RegExp("^#(" + I + ")"),
                CLASS: new RegExp("^\\.(" + I + ")"),
                TAG: new RegExp("^(" + I + "|[*])"),
                ATTR: new RegExp("^" + N),
                PSEUDO: new RegExp("^" + M),
                CHILD: new RegExp(
                  "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
                    A +
                    "*(even|odd|(([+-]|)(\\d*)n|)" +
                    A +
                    "*(?:([+-]|)" +
                    A +
                    "*(\\d+)|))" +
                    A +
                    "*\\)|)",
                  "i"
                ),
                bool: new RegExp("^(?:" + E + ")$", "i"),
                needsContext: new RegExp(
                  "^" +
                    A +
                    "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
                    A +
                    "*((?:-\\d)?\\d*)" +
                    A +
                    "*\\)|)(?=[^-]|$)",
                  "i"
                ),
              },
              V = /^(?:input|select|textarea|button)$/i,
              U = /^h\d$/i,
              z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
              J = /[+~]/,
              X = new RegExp(
                "\\\\[\\da-fA-F]{1,6}" + A + "?|\\\\([^\\r\\n\\f])",
                "g"
              ),
              G = function (e, t) {
                var n = "0x" + e.slice(1) - 65536;
                return (
                  t ||
                  (n < 0
                    ? String.fromCharCode(n + 65536)
                    : String.fromCharCode(
                        (n >> 10) | 55296,
                        (1023 & n) | 56320
                      ))
                );
              },
              Y = function () {
                ce();
              },
              K = fe(
                function (e) {
                  return !0 === e.disabled && T(e, "fieldset");
                },
                { dir: "parentNode", next: "legend" }
              );
            try {
              g.apply((i = a.call(O.childNodes)), O.childNodes),
                i[O.childNodes.length].nodeType;
            } catch (e) {
              g = {
                apply: function (e, t) {
                  L.apply(e, a.call(t));
                },
                call: function (e) {
                  L.apply(e, a.call(arguments, 1));
                },
              };
            }
            function Z(e, t, n, o) {
              var r,
                i,
                s,
                a,
                u,
                l,
                p,
                h = t && t.ownerDocument,
                y = t ? t.nodeType : 9;
              if (
                ((n = n || []),
                "string" != typeof e || !e || (1 !== y && 9 !== y && 11 !== y))
              )
                return n;
              if (!o && (ce(t), (t = t || c), d)) {
                if (11 !== y && (u = z.exec(e)))
                  if ((r = u[1])) {
                    if (9 === y) {
                      if (!(s = t.getElementById(r))) return n;
                      if (s.id === r) return g.call(n, s), n;
                    } else if (
                      h &&
                      (s = h.getElementById(r)) &&
                      Z.contains(t, s) &&
                      s.id === r
                    )
                      return g.call(n, s), n;
                  } else {
                    if (u[2]) return g.apply(n, t.getElementsByTagName(e)), n;
                    if ((r = u[3]) && t.getElementsByClassName)
                      return g.apply(n, t.getElementsByClassName(r)), n;
                  }
                if (!(k[e + " "] || (f && f.test(e)))) {
                  if (((p = e), (h = t), 1 === y && (F.test(e) || H.test(e)))) {
                    for (
                      ((h = (J.test(e) && ae(t.parentNode)) || t) == t &&
                        m.scope) ||
                        ((a = t.getAttribute("id"))
                          ? (a = $.escapeSelector(a))
                          : t.setAttribute("id", (a = v))),
                        i = (l = le(e)).length;
                      i--;

                    )
                      l[i] = (a ? "#" + a : ":scope") + " " + de(l[i]);
                    p = l.join(",");
                  }
                  try {
                    return g.apply(n, h.querySelectorAll(p)), n;
                  } catch (t) {
                    k(e, !0);
                  } finally {
                    a === v && t.removeAttribute("id");
                  }
                }
              }
              return ye(e.replace(P, "$1"), t, n, o);
            }
            function ee() {
              var e = [];
              return function n(o, r) {
                return (
                  e.push(o + " ") > t.cacheLength && delete n[e.shift()],
                  (n[o + " "] = r)
                );
              };
            }
            function te(e) {
              return (e[v] = !0), e;
            }
            function ne(e) {
              var t = c.createElement("fieldset");
              try {
                return !!e(t);
              } catch (e) {
                return !1;
              } finally {
                t.parentNode && t.parentNode.removeChild(t), (t = null);
              }
            }
            function oe(e) {
              return function (t) {
                return T(t, "input") && t.type === e;
              };
            }
            function re(e) {
              return function (t) {
                return (T(t, "input") || T(t, "button")) && t.type === e;
              };
            }
            function ie(e) {
              return function (t) {
                return "form" in t
                  ? t.parentNode && !1 === t.disabled
                    ? "label" in t
                      ? "label" in t.parentNode
                        ? t.parentNode.disabled === e
                        : t.disabled === e
                      : t.isDisabled === e ||
                        (t.isDisabled !== !e && K(t) === e)
                    : t.disabled === e
                  : "label" in t && t.disabled === e;
              };
            }
            function se(e) {
              return te(function (t) {
                return (
                  (t = +t),
                  te(function (n, o) {
                    for (var r, i = e([], n.length, t), s = i.length; s--; )
                      n[(r = i[s])] && (n[r] = !(o[r] = n[r]));
                  })
                );
              });
            }
            function ae(e) {
              return e && void 0 !== e.getElementsByTagName && e;
            }
            function ce(e) {
              var n,
                o = e ? e.ownerDocument || e : O;
              return o != c && 9 === o.nodeType && o.documentElement
                ? ((u = (c = o).documentElement),
                  (d = !$.isXMLDoc(c)),
                  (h =
                    u.matches ||
                    u.webkitMatchesSelector ||
                    u.msMatchesSelector),
                  u.msMatchesSelector &&
                    O != c &&
                    (n = c.defaultView) &&
                    n.top !== n &&
                    n.addEventListener("unload", Y),
                  (m.getById = ne(function (e) {
                    return (
                      (u.appendChild(e).id = $.expando),
                      !c.getElementsByName ||
                        !c.getElementsByName($.expando).length
                    );
                  })),
                  (m.disconnectedMatch = ne(function (e) {
                    return h.call(e, "*");
                  })),
                  (m.scope = ne(function () {
                    return c.querySelectorAll(":scope");
                  })),
                  (m.cssHas = ne(function () {
                    try {
                      return c.querySelector(":has(*,:jqfake)"), !1;
                    } catch (e) {
                      return !0;
                    }
                  })),
                  m.getById
                    ? ((t.filter.ID = function (e) {
                        var t = e.replace(X, G);
                        return function (e) {
                          return e.getAttribute("id") === t;
                        };
                      }),
                      (t.find.ID = function (e, t) {
                        if (void 0 !== t.getElementById && d) {
                          var n = t.getElementById(e);
                          return n ? [n] : [];
                        }
                      }))
                    : ((t.filter.ID = function (e) {
                        var t = e.replace(X, G);
                        return function (e) {
                          var n =
                            void 0 !== e.getAttributeNode &&
                            e.getAttributeNode("id");
                          return n && n.value === t;
                        };
                      }),
                      (t.find.ID = function (e, t) {
                        if (void 0 !== t.getElementById && d) {
                          var n,
                            o,
                            r,
                            i = t.getElementById(e);
                          if (i) {
                            if ((n = i.getAttributeNode("id")) && n.value === e)
                              return [i];
                            for (
                              r = t.getElementsByName(e), o = 0;
                              (i = r[o++]);

                            )
                              if (
                                (n = i.getAttributeNode("id")) &&
                                n.value === e
                              )
                                return [i];
                          }
                          return [];
                        }
                      })),
                  (t.find.TAG = function (e, t) {
                    return void 0 !== t.getElementsByTagName
                      ? t.getElementsByTagName(e)
                      : t.querySelectorAll(e);
                  }),
                  (t.find.CLASS = function (e, t) {
                    if (void 0 !== t.getElementsByClassName && d)
                      return t.getElementsByClassName(e);
                  }),
                  (f = []),
                  ne(function (e) {
                    var t;
                    (u.appendChild(e).innerHTML =
                      "<a id='" +
                      v +
                      "' href='' disabled='disabled'></a><select id='" +
                      v +
                      "-\r\\' disabled='disabled'><option selected=''></option></select>"),
                      e.querySelectorAll("[selected]").length ||
                        f.push("\\[" + A + "*(?:value|" + E + ")"),
                      e.querySelectorAll("[id~=" + v + "-]").length ||
                        f.push("~="),
                      e.querySelectorAll("a#" + v + "+*").length ||
                        f.push(".#.+[+~]"),
                      e.querySelectorAll(":checked").length ||
                        f.push(":checked"),
                      (t = c.createElement("input")).setAttribute(
                        "type",
                        "hidden"
                      ),
                      e.appendChild(t).setAttribute("name", "D"),
                      (u.appendChild(e).disabled = !0),
                      2 !== e.querySelectorAll(":disabled").length &&
                        f.push(":enabled", ":disabled"),
                      (t = c.createElement("input")).setAttribute("name", ""),
                      e.appendChild(t),
                      e.querySelectorAll("[name='']").length ||
                        f.push(
                          "\\[" + A + "*name" + A + "*=" + A + "*(?:''|\"\")"
                        );
                  }),
                  m.cssHas || f.push(":has"),
                  (f = f.length && new RegExp(f.join("|"))),
                  (S = function (e, t) {
                    if (e === t) return (s = !0), 0;
                    var n =
                      !e.compareDocumentPosition - !t.compareDocumentPosition;
                    return (
                      n ||
                      (1 &
                        (n =
                          (e.ownerDocument || e) == (t.ownerDocument || t)
                            ? e.compareDocumentPosition(t)
                            : 1) ||
                      (!m.sortDetached && t.compareDocumentPosition(e) === n)
                        ? e === c || (e.ownerDocument == O && Z.contains(O, e))
                          ? -1
                          : t === c ||
                            (t.ownerDocument == O && Z.contains(O, t))
                          ? 1
                          : r
                          ? l.call(r, e) - l.call(r, t)
                          : 0
                        : 4 & n
                        ? -1
                        : 1)
                    );
                  }),
                  c)
                : c;
            }
            for (e in ((Z.matches = function (e, t) {
              return Z(e, null, null, t);
            }),
            (Z.matchesSelector = function (e, t) {
              if ((ce(e), d && !k[t + " "] && (!f || !f.test(t))))
                try {
                  var n = h.call(e, t);
                  if (
                    n ||
                    m.disconnectedMatch ||
                    (e.document && 11 !== e.document.nodeType)
                  )
                    return n;
                } catch (e) {
                  k(t, !0);
                }
              return Z(t, c, null, [e]).length > 0;
            }),
            (Z.contains = function (e, t) {
              return (e.ownerDocument || e) != c && ce(e), $.contains(e, t);
            }),
            (Z.attr = function (e, n) {
              (e.ownerDocument || e) != c && ce(e);
              var o = t.attrHandle[n.toLowerCase()],
                r =
                  o && p.call(t.attrHandle, n.toLowerCase())
                    ? o(e, n, !d)
                    : void 0;
              return void 0 !== r ? r : e.getAttribute(n);
            }),
            (Z.error = function (e) {
              throw new Error("Syntax error, unrecognized expression: " + e);
            }),
            ($.uniqueSort = function (e) {
              var t,
                n = [],
                o = 0,
                i = 0;
              if (
                ((s = !m.sortStable),
                (r = !m.sortStable && a.call(e, 0)),
                j.call(e, S),
                s)
              ) {
                for (; (t = e[i++]); ) t === e[i] && (o = n.push(i));
                for (; o--; ) q.call(e, n[o], 1);
              }
              return (r = null), e;
            }),
            ($.fn.uniqueSort = function () {
              return this.pushStack($.uniqueSort(a.apply(this)));
            }),
            (t = $.expr =
              {
                cacheLength: 50,
                createPseudo: te,
                match: W,
                attrHandle: {},
                find: {},
                relative: {
                  ">": { dir: "parentNode", first: !0 },
                  " ": { dir: "parentNode" },
                  "+": { dir: "previousSibling", first: !0 },
                  "~": { dir: "previousSibling" },
                },
                preFilter: {
                  ATTR: function (e) {
                    return (
                      (e[1] = e[1].replace(X, G)),
                      (e[3] = (e[3] || e[4] || e[5] || "").replace(X, G)),
                      "~=" === e[2] && (e[3] = " " + e[3] + " "),
                      e.slice(0, 4)
                    );
                  },
                  CHILD: function (e) {
                    return (
                      (e[1] = e[1].toLowerCase()),
                      "nth" === e[1].slice(0, 3)
                        ? (e[3] || Z.error(e[0]),
                          (e[4] = +(e[4]
                            ? e[5] + (e[6] || 1)
                            : 2 * ("even" === e[3] || "odd" === e[3]))),
                          (e[5] = +(e[7] + e[8] || "odd" === e[3])))
                        : e[3] && Z.error(e[0]),
                      e
                    );
                  },
                  PSEUDO: function (e) {
                    var t,
                      n = !e[6] && e[2];
                    return W.CHILD.test(e[0])
                      ? null
                      : (e[3]
                          ? (e[2] = e[4] || e[5] || "")
                          : n &&
                            Q.test(n) &&
                            (t = le(n, !0)) &&
                            (t = n.indexOf(")", n.length - t) - n.length) &&
                            ((e[0] = e[0].slice(0, t)), (e[2] = n.slice(0, t))),
                        e.slice(0, 3));
                  },
                },
                filter: {
                  TAG: function (e) {
                    var t = e.replace(X, G).toLowerCase();
                    return "*" === e
                      ? function () {
                          return !0;
                        }
                      : function (e) {
                          return T(e, t);
                        };
                  },
                  CLASS: function (e) {
                    var t = w[e + " "];
                    return (
                      t ||
                      ((t = new RegExp(
                        "(^|" + A + ")" + e + "(" + A + "|$)"
                      )) &&
                        w(e, function (e) {
                          return t.test(
                            ("string" == typeof e.className && e.className) ||
                              (void 0 !== e.getAttribute &&
                                e.getAttribute("class")) ||
                              ""
                          );
                        }))
                    );
                  },
                  ATTR: function (e, t, n) {
                    return function (o) {
                      var r = Z.attr(o, e);
                      return null == r
                        ? "!=" === t
                        : !t ||
                            ((r += ""),
                            "=" === t
                              ? r === n
                              : "!=" === t
                              ? r !== n
                              : "^=" === t
                              ? n && 0 === r.indexOf(n)
                              : "*=" === t
                              ? n && r.indexOf(n) > -1
                              : "$=" === t
                              ? n && r.slice(-n.length) === n
                              : "~=" === t
                              ? (" " + r.replace(R, " ") + " ").indexOf(n) > -1
                              : "|=" === t &&
                                (r === n ||
                                  r.slice(0, n.length + 1) === n + "-"));
                    };
                  },
                  CHILD: function (e, t, n, o, r) {
                    var i = "nth" !== e.slice(0, 3),
                      s = "last" !== e.slice(-4),
                      a = "of-type" === t;
                    return 1 === o && 0 === r
                      ? function (e) {
                          return !!e.parentNode;
                        }
                      : function (t, n, c) {
                          var u,
                            l,
                            d,
                            f,
                            p,
                            h = i !== s ? "nextSibling" : "previousSibling",
                            g = t.parentNode,
                            m = a && t.nodeName.toLowerCase(),
                            b = !c && !a,
                            w = !1;
                          if (g) {
                            if (i) {
                              for (; h; ) {
                                for (d = t; (d = d[h]); )
                                  if (a ? T(d, m) : 1 === d.nodeType) return !1;
                                p = h = "only" === e && !p && "nextSibling";
                              }
                              return !0;
                            }
                            if (
                              ((p = [s ? g.firstChild : g.lastChild]), s && b)
                            ) {
                              for (
                                w =
                                  (f =
                                    (u =
                                      (l = g[v] || (g[v] = {}))[e] || [])[0] ===
                                      y && u[1]) && u[2],
                                  d = f && g.childNodes[f];
                                (d =
                                  (++f && d && d[h]) || (w = f = 0) || p.pop());

                              )
                                if (1 === d.nodeType && ++w && d === t) {
                                  l[e] = [y, f, w];
                                  break;
                                }
                            } else if (
                              (b &&
                                (w = f =
                                  (u =
                                    (l = t[v] || (t[v] = {}))[e] || [])[0] ===
                                    y && u[1]),
                              !1 === w)
                            )
                              for (
                                ;
                                (d =
                                  (++f && d && d[h]) ||
                                  (w = f = 0) ||
                                  p.pop()) &&
                                (!(a ? T(d, m) : 1 === d.nodeType) ||
                                  !++w ||
                                  (b && ((l = d[v] || (d[v] = {}))[e] = [y, w]),
                                  d !== t));

                              );
                            return (w -= r) === o || (w % o == 0 && w / o >= 0);
                          }
                        };
                  },
                  PSEUDO: function (e, n) {
                    var o,
                      r =
                        t.pseudos[e] ||
                        t.setFilters[e.toLowerCase()] ||
                        Z.error("unsupported pseudo: " + e);
                    return r[v]
                      ? r(n)
                      : r.length > 1
                      ? ((o = [e, e, "", n]),
                        t.setFilters.hasOwnProperty(e.toLowerCase())
                          ? te(function (e, t) {
                              for (var o, i = r(e, n), s = i.length; s--; )
                                e[(o = l.call(e, i[s]))] = !(t[o] = i[s]);
                            })
                          : function (e) {
                              return r(e, 0, o);
                            })
                      : r;
                  },
                },
                pseudos: {
                  not: te(function (e) {
                    var t = [],
                      n = [],
                      o = ve(e.replace(P, "$1"));
                    return o[v]
                      ? te(function (e, t, n, r) {
                          for (
                            var i, s = o(e, null, r, []), a = e.length;
                            a--;

                          )
                            (i = s[a]) && (e[a] = !(t[a] = i));
                        })
                      : function (e, r, i) {
                          return (
                            (t[0] = e),
                            o(t, null, i, n),
                            (t[0] = null),
                            !n.pop()
                          );
                        };
                  }),
                  has: te(function (e) {
                    return function (t) {
                      return Z(e, t).length > 0;
                    };
                  }),
                  contains: te(function (e) {
                    return (
                      (e = e.replace(X, G)),
                      function (t) {
                        return (t.textContent || $.text(t)).indexOf(e) > -1;
                      }
                    );
                  }),
                  lang: te(function (e) {
                    return (
                      B.test(e || "") || Z.error("unsupported lang: " + e),
                      (e = e.replace(X, G).toLowerCase()),
                      function (t) {
                        var n;
                        do {
                          if (
                            (n = d
                              ? t.lang
                              : t.getAttribute("xml:lang") ||
                                t.getAttribute("lang"))
                          )
                            return (
                              (n = n.toLowerCase()) === e ||
                              0 === n.indexOf(e + "-")
                            );
                        } while ((t = t.parentNode) && 1 === t.nodeType);
                        return !1;
                      }
                    );
                  }),
                  target: function (e) {
                    var t = o.location && o.location.hash;
                    return t && t.slice(1) === e.id;
                  },
                  root: function (e) {
                    return e === u;
                  },
                  focus: function (e) {
                    return (
                      e ===
                        (function () {
                          try {
                            return c.activeElement;
                          } catch (e) {}
                        })() &&
                      c.hasFocus() &&
                      !!(e.type || e.href || ~e.tabIndex)
                    );
                  },
                  enabled: ie(!1),
                  disabled: ie(!0),
                  checked: function (e) {
                    return (
                      (T(e, "input") && !!e.checked) ||
                      (T(e, "option") && !!e.selected)
                    );
                  },
                  selected: function (e) {
                    return (
                      e.parentNode && e.parentNode.selectedIndex,
                      !0 === e.selected
                    );
                  },
                  empty: function (e) {
                    for (e = e.firstChild; e; e = e.nextSibling)
                      if (e.nodeType < 6) return !1;
                    return !0;
                  },
                  parent: function (e) {
                    return !t.pseudos.empty(e);
                  },
                  header: function (e) {
                    return U.test(e.nodeName);
                  },
                  input: function (e) {
                    return V.test(e.nodeName);
                  },
                  button: function (e) {
                    return (
                      (T(e, "input") && "button" === e.type) || T(e, "button")
                    );
                  },
                  text: function (e) {
                    var t;
                    return (
                      T(e, "input") &&
                      "text" === e.type &&
                      (null == (t = e.getAttribute("type")) ||
                        "text" === t.toLowerCase())
                    );
                  },
                  first: se(function () {
                    return [0];
                  }),
                  last: se(function (e, t) {
                    return [t - 1];
                  }),
                  eq: se(function (e, t, n) {
                    return [n < 0 ? n + t : n];
                  }),
                  even: se(function (e, t) {
                    for (var n = 0; n < t; n += 2) e.push(n);
                    return e;
                  }),
                  odd: se(function (e, t) {
                    for (var n = 1; n < t; n += 2) e.push(n);
                    return e;
                  }),
                  lt: se(function (e, t, n) {
                    var o;
                    for (o = n < 0 ? n + t : n > t ? t : n; --o >= 0; )
                      e.push(o);
                    return e;
                  }),
                  gt: se(function (e, t, n) {
                    for (var o = n < 0 ? n + t : n; ++o < t; ) e.push(o);
                    return e;
                  }),
                },
              }),
            (t.pseudos.nth = t.pseudos.eq),
            { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }))
              t.pseudos[e] = oe(e);
            for (e in { submit: !0, reset: !0 }) t.pseudos[e] = re(e);
            function ue() {}
            function le(e, n) {
              var o,
                r,
                i,
                s,
                a,
                c,
                u,
                l = x[e + " "];
              if (l) return n ? 0 : l.slice(0);
              for (a = e, c = [], u = t.preFilter; a; ) {
                for (s in ((o && !(r = D.exec(a))) ||
                  (r && (a = a.slice(r[0].length) || a), c.push((i = []))),
                (o = !1),
                (r = H.exec(a)) &&
                  ((o = r.shift()),
                  i.push({ value: o, type: r[0].replace(P, " ") }),
                  (a = a.slice(o.length))),
                t.filter))
                  !(r = W[s].exec(a)) ||
                    (u[s] && !(r = u[s](r))) ||
                    ((o = r.shift()),
                    i.push({ value: o, type: s, matches: r }),
                    (a = a.slice(o.length)));
                if (!o) break;
              }
              return n ? a.length : a ? Z.error(e) : x(e, c).slice(0);
            }
            function de(e) {
              for (var t = 0, n = e.length, o = ""; t < n; t++) o += e[t].value;
              return o;
            }
            function fe(e, t, n) {
              var o = t.dir,
                r = t.next,
                i = r || o,
                s = n && "parentNode" === i,
                a = b++;
              return t.first
                ? function (t, n, r) {
                    for (; (t = t[o]); )
                      if (1 === t.nodeType || s) return e(t, n, r);
                    return !1;
                  }
                : function (t, n, c) {
                    var u,
                      l,
                      d = [y, a];
                    if (c) {
                      for (; (t = t[o]); )
                        if ((1 === t.nodeType || s) && e(t, n, c)) return !0;
                    } else
                      for (; (t = t[o]); )
                        if (1 === t.nodeType || s)
                          if (((l = t[v] || (t[v] = {})), r && T(t, r)))
                            t = t[o] || t;
                          else {
                            if ((u = l[i]) && u[0] === y && u[1] === a)
                              return (d[2] = u[2]);
                            if (((l[i] = d), (d[2] = e(t, n, c)))) return !0;
                          }
                    return !1;
                  };
            }
            function pe(e) {
              return e.length > 1
                ? function (t, n, o) {
                    for (var r = e.length; r--; ) if (!e[r](t, n, o)) return !1;
                    return !0;
                  }
                : e[0];
            }
            function he(e, t, n, o, r) {
              for (
                var i, s = [], a = 0, c = e.length, u = null != t;
                a < c;
                a++
              )
                (i = e[a]) &&
                  ((n && !n(i, o, r)) || (s.push(i), u && t.push(a)));
              return s;
            }
            function ge(e, t, n, o, r, i) {
              return (
                o && !o[v] && (o = ge(o)),
                r && !r[v] && (r = ge(r, i)),
                te(function (i, s, a, c) {
                  var u,
                    d,
                    f,
                    p,
                    h = [],
                    m = [],
                    v = s.length,
                    y =
                      i ||
                      (function (e, t, n) {
                        for (var o = 0, r = t.length; o < r; o++) Z(e, t[o], n);
                        return n;
                      })(t || "*", a.nodeType ? [a] : a, []),
                    b = !e || (!i && t) ? y : he(y, h, e, a, c);
                  if (
                    (n
                      ? n(b, (p = r || (i ? e : v || o) ? [] : s), a, c)
                      : (p = b),
                    o)
                  )
                    for (u = he(p, m), o(u, [], a, c), d = u.length; d--; )
                      (f = u[d]) && (p[m[d]] = !(b[m[d]] = f));
                  if (i) {
                    if (r || e) {
                      if (r) {
                        for (u = [], d = p.length; d--; )
                          (f = p[d]) && u.push((b[d] = f));
                        r(null, (p = []), u, c);
                      }
                      for (d = p.length; d--; )
                        (f = p[d]) &&
                          (u = r ? l.call(i, f) : h[d]) > -1 &&
                          (i[u] = !(s[u] = f));
                    }
                  } else (p = he(p === s ? p.splice(v, p.length) : p)), r ? r(null, s, p, c) : g.apply(s, p);
                })
              );
            }
            function me(e) {
              for (
                var o,
                  r,
                  i,
                  s = e.length,
                  a = t.relative[e[0].type],
                  c = a || t.relative[" "],
                  u = a ? 1 : 0,
                  d = fe(
                    function (e) {
                      return e === o;
                    },
                    c,
                    !0
                  ),
                  f = fe(
                    function (e) {
                      return l.call(o, e) > -1;
                    },
                    c,
                    !0
                  ),
                  p = [
                    function (e, t, r) {
                      var i =
                        (!a && (r || t != n)) ||
                        ((o = t).nodeType ? d(e, t, r) : f(e, t, r));
                      return (o = null), i;
                    },
                  ];
                u < s;
                u++
              )
                if ((r = t.relative[e[u].type])) p = [fe(pe(p), r)];
                else {
                  if ((r = t.filter[e[u].type].apply(null, e[u].matches))[v]) {
                    for (i = ++u; i < s && !t.relative[e[i].type]; i++);
                    return ge(
                      u > 1 && pe(p),
                      u > 1 &&
                        de(
                          e
                            .slice(0, u - 1)
                            .concat({ value: " " === e[u - 2].type ? "*" : "" })
                        ).replace(P, "$1"),
                      r,
                      u < i && me(e.slice(u, i)),
                      i < s && me((e = e.slice(i))),
                      i < s && de(e)
                    );
                  }
                  p.push(r);
                }
              return pe(p);
            }
            function ve(e, o) {
              var r,
                i = [],
                s = [],
                a = _[e + " "];
              if (!a) {
                for (o || (o = le(e)), r = o.length; r--; )
                  (a = me(o[r]))[v] ? i.push(a) : s.push(a);
                (a = _(
                  e,
                  (function (e, o) {
                    var r = o.length > 0,
                      i = e.length > 0,
                      s = function (s, a, u, l, f) {
                        var p,
                          h,
                          m,
                          v = 0,
                          b = "0",
                          w = s && [],
                          x = [],
                          _ = n,
                          k = s || (i && t.find.TAG("*", f)),
                          S = (y += null == _ ? 1 : Math.random() || 0.1),
                          E = k.length;
                        for (
                          f && (n = a == c || a || f);
                          b !== E && null != (p = k[b]);
                          b++
                        ) {
                          if (i && p) {
                            for (
                              h = 0,
                                a || p.ownerDocument == c || (ce(p), (u = !d));
                              (m = e[h++]);

                            )
                              if (m(p, a || c, u)) {
                                g.call(l, p);
                                break;
                              }
                            f && (y = S);
                          }
                          r && ((p = !m && p) && v--, s && w.push(p));
                        }
                        if (((v += b), r && b !== v)) {
                          for (h = 0; (m = o[h++]); ) m(w, x, a, u);
                          if (s) {
                            if (v > 0)
                              for (; b--; ) w[b] || x[b] || (x[b] = C.call(l));
                            x = he(x);
                          }
                          g.apply(l, x),
                            f &&
                              !s &&
                              x.length > 0 &&
                              v + o.length > 1 &&
                              $.uniqueSort(l);
                        }
                        return f && ((y = S), (n = _)), w;
                      };
                    return r ? te(s) : s;
                  })(s, i)
                )),
                  (a.selector = e);
              }
              return a;
            }
            function ye(e, n, o, r) {
              var i,
                s,
                a,
                c,
                u,
                l = "function" == typeof e && e,
                f = !r && le((e = l.selector || e));
              if (((o = o || []), 1 === f.length)) {
                if (
                  (s = f[0] = f[0].slice(0)).length > 2 &&
                  "ID" === (a = s[0]).type &&
                  9 === n.nodeType &&
                  d &&
                  t.relative[s[1].type]
                ) {
                  if (
                    !(n = (t.find.ID(a.matches[0].replace(X, G), n) || [])[0])
                  )
                    return o;
                  l && (n = n.parentNode),
                    (e = e.slice(s.shift().value.length));
                }
                for (
                  i = W.needsContext.test(e) ? 0 : s.length;
                  i-- && ((a = s[i]), !t.relative[(c = a.type)]);

                )
                  if (
                    (u = t.find[c]) &&
                    (r = u(
                      a.matches[0].replace(X, G),
                      (J.test(s[0].type) && ae(n.parentNode)) || n
                    ))
                  ) {
                    if ((s.splice(i, 1), !(e = r.length && de(s))))
                      return g.apply(o, r), o;
                    break;
                  }
              }
              return (
                (l || ve(e, f))(
                  r,
                  n,
                  !d,
                  o,
                  !n || (J.test(e) && ae(n.parentNode)) || n
                ),
                o
              );
            }
            (ue.prototype = t.filters = t.pseudos),
              (t.setFilters = new ue()),
              (m.sortStable = v.split("").sort(S).join("") === v),
              ce(),
              (m.sortDetached = ne(function (e) {
                return (
                  1 & e.compareDocumentPosition(c.createElement("fieldset"))
                );
              })),
              ($.find = Z),
              ($.expr[":"] = $.expr.pseudos),
              ($.unique = $.uniqueSort),
              (Z.compile = ve),
              (Z.select = ye),
              (Z.setDocument = ce),
              (Z.tokenize = le),
              (Z.escape = $.escapeSelector),
              (Z.getText = $.text),
              (Z.isXML = $.isXMLDoc),
              (Z.selectors = $.expr),
              (Z.support = $.support),
              (Z.uniqueSort = $.uniqueSort);
          })();
          var M = function (e, t, n) {
              for (
                var o = [], r = void 0 !== n;
                (e = e[t]) && 9 !== e.nodeType;

              )
                if (1 === e.nodeType) {
                  if (r && $(e).is(n)) break;
                  o.push(e);
                }
              return o;
            },
            R = function (e, t) {
              for (var n = []; e; e = e.nextSibling)
                1 === e.nodeType && e !== t && n.push(e);
              return n;
            },
            D = $.expr.match.needsContext,
            H =
              /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
          function F(e, t, n) {
            return v(t)
              ? $.grep(e, function (e, o) {
                  return !!t.call(e, o, e) !== n;
                })
              : t.nodeType
              ? $.grep(e, function (e) {
                  return (e === t) !== n;
                })
              : "string" != typeof t
              ? $.grep(e, function (e) {
                  return l.call(t, e) > -1 !== n;
                })
              : $.filter(t, e, n);
          }
          ($.filter = function (e, t, n) {
            var o = t[0];
            return (
              n && (e = ":not(" + e + ")"),
              1 === t.length && 1 === o.nodeType
                ? $.find.matchesSelector(o, e)
                  ? [o]
                  : []
                : $.find.matches(
                    e,
                    $.grep(t, function (e) {
                      return 1 === e.nodeType;
                    })
                  )
            );
          }),
            $.fn.extend({
              find: function (e) {
                var t,
                  n,
                  o = this.length,
                  r = this;
                if ("string" != typeof e)
                  return this.pushStack(
                    $(e).filter(function () {
                      for (t = 0; t < o; t++)
                        if ($.contains(r[t], this)) return !0;
                    })
                  );
                for (n = this.pushStack([]), t = 0; t < o; t++)
                  $.find(e, r[t], n);
                return o > 1 ? $.uniqueSort(n) : n;
              },
              filter: function (e) {
                return this.pushStack(F(this, e || [], !1));
              },
              not: function (e) {
                return this.pushStack(F(this, e || [], !0));
              },
              is: function (e) {
                return !!F(
                  this,
                  "string" == typeof e && D.test(e) ? $(e) : e || [],
                  !1
                ).length;
              },
            });
          var Q,
            B = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
          (($.fn.init = function (e, t, n) {
            var o, r;
            if (!e) return this;
            if (((n = n || Q), "string" == typeof e)) {
              if (
                !(o =
                  "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3
                    ? [null, e, null]
                    : B.exec(e)) ||
                (!o[1] && t)
              )
                return !t || t.jquery
                  ? (t || n).find(e)
                  : this.constructor(t).find(e);
              if (o[1]) {
                if (
                  ((t = t instanceof $ ? t[0] : t),
                  $.merge(
                    this,
                    $.parseHTML(
                      o[1],
                      t && t.nodeType ? t.ownerDocument || t : b,
                      !0
                    )
                  ),
                  H.test(o[1]) && $.isPlainObject(t))
                )
                  for (o in t) v(this[o]) ? this[o](t[o]) : this.attr(o, t[o]);
                return this;
              }
              return (
                (r = b.getElementById(o[2])) &&
                  ((this[0] = r), (this.length = 1)),
                this
              );
            }
            return e.nodeType
              ? ((this[0] = e), (this.length = 1), this)
              : v(e)
              ? void 0 !== n.ready
                ? n.ready(e)
                : e($)
              : $.makeArray(e, this);
          }).prototype = $.fn),
            (Q = $(b));
          var W = /^(?:parents|prev(?:Until|All))/,
            V = { children: !0, contents: !0, next: !0, prev: !0 };
          function U(e, t) {
            for (; (e = e[t]) && 1 !== e.nodeType; );
            return e;
          }
          $.fn.extend({
            has: function (e) {
              var t = $(e, this),
                n = t.length;
              return this.filter(function () {
                for (var e = 0; e < n; e++)
                  if ($.contains(this, t[e])) return !0;
              });
            },
            closest: function (e, t) {
              var n,
                o = 0,
                r = this.length,
                i = [],
                s = "string" != typeof e && $(e);
              if (!D.test(e))
                for (; o < r; o++)
                  for (n = this[o]; n && n !== t; n = n.parentNode)
                    if (
                      n.nodeType < 11 &&
                      (s
                        ? s.index(n) > -1
                        : 1 === n.nodeType && $.find.matchesSelector(n, e))
                    ) {
                      i.push(n);
                      break;
                    }
              return this.pushStack(i.length > 1 ? $.uniqueSort(i) : i);
            },
            index: function (e) {
              return e
                ? "string" == typeof e
                  ? l.call($(e), this[0])
                  : l.call(this, e.jquery ? e[0] : e)
                : this[0] && this[0].parentNode
                ? this.first().prevAll().length
                : -1;
            },
            add: function (e, t) {
              return this.pushStack($.uniqueSort($.merge(this.get(), $(e, t))));
            },
            addBack: function (e) {
              return this.add(
                null == e ? this.prevObject : this.prevObject.filter(e)
              );
            },
          }),
            $.each(
              {
                parent: function (e) {
                  var t = e.parentNode;
                  return t && 11 !== t.nodeType ? t : null;
                },
                parents: function (e) {
                  return M(e, "parentNode");
                },
                parentsUntil: function (e, t, n) {
                  return M(e, "parentNode", n);
                },
                next: function (e) {
                  return U(e, "nextSibling");
                },
                prev: function (e) {
                  return U(e, "previousSibling");
                },
                nextAll: function (e) {
                  return M(e, "nextSibling");
                },
                prevAll: function (e) {
                  return M(e, "previousSibling");
                },
                nextUntil: function (e, t, n) {
                  return M(e, "nextSibling", n);
                },
                prevUntil: function (e, t, n) {
                  return M(e, "previousSibling", n);
                },
                siblings: function (e) {
                  return R((e.parentNode || {}).firstChild, e);
                },
                children: function (e) {
                  return R(e.firstChild);
                },
                contents: function (e) {
                  return null != e.contentDocument && s(e.contentDocument)
                    ? e.contentDocument
                    : (T(e, "template") && (e = e.content || e),
                      $.merge([], e.childNodes));
                },
              },
              function (e, t) {
                $.fn[e] = function (n, o) {
                  var r = $.map(this, t, n);
                  return (
                    "Until" !== e.slice(-5) && (o = n),
                    o && "string" == typeof o && (r = $.filter(o, r)),
                    this.length > 1 &&
                      (V[e] || $.uniqueSort(r), W.test(e) && r.reverse()),
                    this.pushStack(r)
                  );
                };
              }
            );
          var z = /[^\x20\t\r\n\f]+/g;
          function J(e) {
            return e;
          }
          function X(e) {
            throw e;
          }
          function G(e, t, n, o) {
            var r;
            try {
              e && v((r = e.promise))
                ? r.call(e).done(t).fail(n)
                : e && v((r = e.then))
                ? r.call(e, t, n)
                : t.apply(void 0, [e].slice(o));
            } catch (e) {
              n.apply(void 0, [e]);
            }
          }
          ($.Callbacks = function (e) {
            e =
              "string" == typeof e
                ? (function (e) {
                    var t = {};
                    return (
                      $.each(e.match(z) || [], function (e, n) {
                        t[n] = !0;
                      }),
                      t
                    );
                  })(e)
                : $.extend({}, e);
            var t,
              n,
              o,
              r,
              i = [],
              s = [],
              a = -1,
              c = function () {
                for (r = r || e.once, o = t = !0; s.length; a = -1)
                  for (n = s.shift(); ++a < i.length; )
                    !1 === i[a].apply(n[0], n[1]) &&
                      e.stopOnFalse &&
                      ((a = i.length), (n = !1));
                e.memory || (n = !1), (t = !1), r && (i = n ? [] : "");
              },
              u = {
                add: function () {
                  return (
                    i &&
                      (n && !t && ((a = i.length - 1), s.push(n)),
                      (function t(n) {
                        $.each(n, function (n, o) {
                          v(o)
                            ? (e.unique && u.has(o)) || i.push(o)
                            : o && o.length && "string" !== _(o) && t(o);
                        });
                      })(arguments),
                      n && !t && c()),
                    this
                  );
                },
                remove: function () {
                  return (
                    $.each(arguments, function (e, t) {
                      for (var n; (n = $.inArray(t, i, n)) > -1; )
                        i.splice(n, 1), n <= a && a--;
                    }),
                    this
                  );
                },
                has: function (e) {
                  return e ? $.inArray(e, i) > -1 : i.length > 0;
                },
                empty: function () {
                  return i && (i = []), this;
                },
                disable: function () {
                  return (r = s = []), (i = n = ""), this;
                },
                disabled: function () {
                  return !i;
                },
                lock: function () {
                  return (r = s = []), n || t || (i = n = ""), this;
                },
                locked: function () {
                  return !!r;
                },
                fireWith: function (e, n) {
                  return (
                    r ||
                      ((n = [e, (n = n || []).slice ? n.slice() : n]),
                      s.push(n),
                      t || c()),
                    this
                  );
                },
                fire: function () {
                  return u.fireWith(this, arguments), this;
                },
                fired: function () {
                  return !!o;
                },
              };
            return u;
          }),
            $.extend({
              Deferred: function (e) {
                var t = [
                    [
                      "notify",
                      "progress",
                      $.Callbacks("memory"),
                      $.Callbacks("memory"),
                      2,
                    ],
                    [
                      "resolve",
                      "done",
                      $.Callbacks("once memory"),
                      $.Callbacks("once memory"),
                      0,
                      "resolved",
                    ],
                    [
                      "reject",
                      "fail",
                      $.Callbacks("once memory"),
                      $.Callbacks("once memory"),
                      1,
                      "rejected",
                    ],
                  ],
                  n = "pending",
                  r = {
                    state: function () {
                      return n;
                    },
                    always: function () {
                      return i.done(arguments).fail(arguments), this;
                    },
                    catch: function (e) {
                      return r.then(null, e);
                    },
                    pipe: function () {
                      var e = arguments;
                      return $.Deferred(function (n) {
                        $.each(t, function (t, o) {
                          var r = v(e[o[4]]) && e[o[4]];
                          i[o[1]](function () {
                            var e = r && r.apply(this, arguments);
                            e && v(e.promise)
                              ? e
                                  .promise()
                                  .progress(n.notify)
                                  .done(n.resolve)
                                  .fail(n.reject)
                              : n[o[0] + "With"](this, r ? [e] : arguments);
                          });
                        }),
                          (e = null);
                      }).promise();
                    },
                    then: function (e, n, r) {
                      var i = 0;
                      function s(e, t, n, r) {
                        return function () {
                          var a = this,
                            c = arguments,
                            u = function () {
                              var o, u;
                              if (!(e < i)) {
                                if ((o = n.apply(a, c)) === t.promise())
                                  throw new TypeError(
                                    "Thenable self-resolution"
                                  );
                                (u =
                                  o &&
                                  ("object" == typeof o ||
                                    "function" == typeof o) &&
                                  o.then),
                                  v(u)
                                    ? r
                                      ? u.call(o, s(i, t, J, r), s(i, t, X, r))
                                      : (i++,
                                        u.call(
                                          o,
                                          s(i, t, J, r),
                                          s(i, t, X, r),
                                          s(i, t, J, t.notifyWith)
                                        ))
                                    : (n !== J && ((a = void 0), (c = [o])),
                                      (r || t.resolveWith)(a, c));
                              }
                            },
                            l = r
                              ? u
                              : function () {
                                  try {
                                    u();
                                  } catch (o) {
                                    $.Deferred.exceptionHook &&
                                      $.Deferred.exceptionHook(o, l.error),
                                      e + 1 >= i &&
                                        (n !== X && ((a = void 0), (c = [o])),
                                        t.rejectWith(a, c));
                                  }
                                };
                          e
                            ? l()
                            : ($.Deferred.getErrorHook
                                ? (l.error = $.Deferred.getErrorHook())
                                : $.Deferred.getStackHook &&
                                  (l.error = $.Deferred.getStackHook()),
                              o.setTimeout(l));
                        };
                      }
                      return $.Deferred(function (o) {
                        t[0][3].add(s(0, o, v(r) ? r : J, o.notifyWith)),
                          t[1][3].add(s(0, o, v(e) ? e : J)),
                          t[2][3].add(s(0, o, v(n) ? n : X));
                      }).promise();
                    },
                    promise: function (e) {
                      return null != e ? $.extend(e, r) : r;
                    },
                  },
                  i = {};
                return (
                  $.each(t, function (e, o) {
                    var s = o[2],
                      a = o[5];
                    (r[o[1]] = s.add),
                      a &&
                        s.add(
                          function () {
                            n = a;
                          },
                          t[3 - e][2].disable,
                          t[3 - e][3].disable,
                          t[0][2].lock,
                          t[0][3].lock
                        ),
                      s.add(o[3].fire),
                      (i[o[0]] = function () {
                        return (
                          i[o[0] + "With"](
                            this === i ? void 0 : this,
                            arguments
                          ),
                          this
                        );
                      }),
                      (i[o[0] + "With"] = s.fireWith);
                  }),
                  r.promise(i),
                  e && e.call(i, i),
                  i
                );
              },
              when: function (e) {
                var t = arguments.length,
                  n = t,
                  o = Array(n),
                  r = a.call(arguments),
                  i = $.Deferred(),
                  s = function (e) {
                    return function (n) {
                      (o[e] = this),
                        (r[e] = arguments.length > 1 ? a.call(arguments) : n),
                        --t || i.resolveWith(o, r);
                    };
                  };
                if (
                  t <= 1 &&
                  (G(e, i.done(s(n)).resolve, i.reject, !t),
                  "pending" === i.state() || v(r[n] && r[n].then))
                )
                  return i.then();
                for (; n--; ) G(r[n], s(n), i.reject);
                return i.promise();
              },
            });
          var Y = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
          ($.Deferred.exceptionHook = function (e, t) {
            o.console &&
              o.console.warn &&
              e &&
              Y.test(e.name) &&
              o.console.warn(
                "jQuery.Deferred exception: " + e.message,
                e.stack,
                t
              );
          }),
            ($.readyException = function (e) {
              o.setTimeout(function () {
                throw e;
              });
            });
          var K = $.Deferred();
          function Z() {
            b.removeEventListener("DOMContentLoaded", Z),
              o.removeEventListener("load", Z),
              $.ready();
          }
          ($.fn.ready = function (e) {
            return (
              K.then(e).catch(function (e) {
                $.readyException(e);
              }),
              this
            );
          }),
            $.extend({
              isReady: !1,
              readyWait: 1,
              ready: function (e) {
                (!0 === e ? --$.readyWait : $.isReady) ||
                  (($.isReady = !0),
                  (!0 !== e && --$.readyWait > 0) || K.resolveWith(b, [$]));
              },
            }),
            ($.ready.then = K.then),
            "complete" === b.readyState ||
            ("loading" !== b.readyState && !b.documentElement.doScroll)
              ? o.setTimeout($.ready)
              : (b.addEventListener("DOMContentLoaded", Z),
                o.addEventListener("load", Z));
          var ee = function (e, t, n, o, r, i, s) {
              var a = 0,
                c = e.length,
                u = null == n;
              if ("object" === _(n))
                for (a in ((r = !0), n)) ee(e, t, a, n[a], !0, i, s);
              else if (
                void 0 !== o &&
                ((r = !0),
                v(o) || (s = !0),
                u &&
                  (s
                    ? (t.call(e, o), (t = null))
                    : ((u = t),
                      (t = function (e, t, n) {
                        return u.call($(e), n);
                      }))),
                t)
              )
                for (; a < c; a++)
                  t(e[a], n, s ? o : o.call(e[a], a, t(e[a], n)));
              return r ? e : u ? t.call(e) : c ? t(e[0], n) : i;
            },
            te = /^-ms-/,
            ne = /-([a-z])/g;
          function oe(e, t) {
            return t.toUpperCase();
          }
          function re(e) {
            return e.replace(te, "ms-").replace(ne, oe);
          }
          var ie = function (e) {
            return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType;
          };
          function se() {
            this.expando = $.expando + se.uid++;
          }
          (se.uid = 1),
            (se.prototype = {
              cache: function (e) {
                var t = e[this.expando];
                return (
                  t ||
                    ((t = {}),
                    ie(e) &&
                      (e.nodeType
                        ? (e[this.expando] = t)
                        : Object.defineProperty(e, this.expando, {
                            value: t,
                            configurable: !0,
                          }))),
                  t
                );
              },
              set: function (e, t, n) {
                var o,
                  r = this.cache(e);
                if ("string" == typeof t) r[re(t)] = n;
                else for (o in t) r[re(o)] = t[o];
                return r;
              },
              get: function (e, t) {
                return void 0 === t
                  ? this.cache(e)
                  : e[this.expando] && e[this.expando][re(t)];
              },
              access: function (e, t, n) {
                return void 0 === t ||
                  (t && "string" == typeof t && void 0 === n)
                  ? this.get(e, t)
                  : (this.set(e, t, n), void 0 !== n ? n : t);
              },
              remove: function (e, t) {
                var n,
                  o = e[this.expando];
                if (void 0 !== o) {
                  if (void 0 !== t) {
                    n = (t = Array.isArray(t)
                      ? t.map(re)
                      : (t = re(t)) in o
                      ? [t]
                      : t.match(z) || []).length;
                    for (; n--; ) delete o[t[n]];
                  }
                  (void 0 === t || $.isEmptyObject(o)) &&
                    (e.nodeType
                      ? (e[this.expando] = void 0)
                      : delete e[this.expando]);
                }
              },
              hasData: function (e) {
                var t = e[this.expando];
                return void 0 !== t && !$.isEmptyObject(t);
              },
            });
          var ae = new se(),
            ce = new se(),
            ue = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
            le = /[A-Z]/g;
          function de(e, t, n) {
            var o;
            if (void 0 === n && 1 === e.nodeType)
              if (
                ((o = "data-" + t.replace(le, "-$&").toLowerCase()),
                "string" == typeof (n = e.getAttribute(o)))
              ) {
                try {
                  n = (function (e) {
                    return (
                      "true" === e ||
                      ("false" !== e &&
                        ("null" === e
                          ? null
                          : e === +e + ""
                          ? +e
                          : ue.test(e)
                          ? JSON.parse(e)
                          : e))
                    );
                  })(n);
                } catch (e) {}
                ce.set(e, t, n);
              } else n = void 0;
            return n;
          }
          $.extend({
            hasData: function (e) {
              return ce.hasData(e) || ae.hasData(e);
            },
            data: function (e, t, n) {
              return ce.access(e, t, n);
            },
            removeData: function (e, t) {
              ce.remove(e, t);
            },
            _data: function (e, t, n) {
              return ae.access(e, t, n);
            },
            _removeData: function (e, t) {
              ae.remove(e, t);
            },
          }),
            $.fn.extend({
              data: function (e, t) {
                var n,
                  o,
                  r,
                  i = this[0],
                  s = i && i.attributes;
                if (void 0 === e) {
                  if (
                    this.length &&
                    ((r = ce.get(i)),
                    1 === i.nodeType && !ae.get(i, "hasDataAttrs"))
                  ) {
                    for (n = s.length; n--; )
                      s[n] &&
                        0 === (o = s[n].name).indexOf("data-") &&
                        ((o = re(o.slice(5))), de(i, o, r[o]));
                    ae.set(i, "hasDataAttrs", !0);
                  }
                  return r;
                }
                return "object" == typeof e
                  ? this.each(function () {
                      ce.set(this, e);
                    })
                  : ee(
                      this,
                      function (t) {
                        var n;
                        if (i && void 0 === t)
                          return void 0 !== (n = ce.get(i, e)) ||
                            void 0 !== (n = de(i, e))
                            ? n
                            : void 0;
                        this.each(function () {
                          ce.set(this, e, t);
                        });
                      },
                      null,
                      t,
                      arguments.length > 1,
                      null,
                      !0
                    );
              },
              removeData: function (e) {
                return this.each(function () {
                  ce.remove(this, e);
                });
              },
            }),
            $.extend({
              queue: function (e, t, n) {
                var o;
                if (e)
                  return (
                    (t = (t || "fx") + "queue"),
                    (o = ae.get(e, t)),
                    n &&
                      (!o || Array.isArray(n)
                        ? (o = ae.access(e, t, $.makeArray(n)))
                        : o.push(n)),
                    o || []
                  );
              },
              dequeue: function (e, t) {
                t = t || "fx";
                var n = $.queue(e, t),
                  o = n.length,
                  r = n.shift(),
                  i = $._queueHooks(e, t);
                "inprogress" === r && ((r = n.shift()), o--),
                  r &&
                    ("fx" === t && n.unshift("inprogress"),
                    delete i.stop,
                    r.call(
                      e,
                      function () {
                        $.dequeue(e, t);
                      },
                      i
                    )),
                  !o && i && i.empty.fire();
              },
              _queueHooks: function (e, t) {
                var n = t + "queueHooks";
                return (
                  ae.get(e, n) ||
                  ae.access(e, n, {
                    empty: $.Callbacks("once memory").add(function () {
                      ae.remove(e, [t + "queue", n]);
                    }),
                  })
                );
              },
            }),
            $.fn.extend({
              queue: function (e, t) {
                var n = 2;
                return (
                  "string" != typeof e && ((t = e), (e = "fx"), n--),
                  arguments.length < n
                    ? $.queue(this[0], e)
                    : void 0 === t
                    ? this
                    : this.each(function () {
                        var n = $.queue(this, e, t);
                        $._queueHooks(this, e),
                          "fx" === e &&
                            "inprogress" !== n[0] &&
                            $.dequeue(this, e);
                      })
                );
              },
              dequeue: function (e) {
                return this.each(function () {
                  $.dequeue(this, e);
                });
              },
              clearQueue: function (e) {
                return this.queue(e || "fx", []);
              },
              promise: function (e, t) {
                var n,
                  o = 1,
                  r = $.Deferred(),
                  i = this,
                  s = this.length,
                  a = function () {
                    --o || r.resolveWith(i, [i]);
                  };
                for (
                  "string" != typeof e && ((t = e), (e = void 0)),
                    e = e || "fx";
                  s--;

                )
                  (n = ae.get(i[s], e + "queueHooks")) &&
                    n.empty &&
                    (o++, n.empty.add(a));
                return a(), r.promise(t);
              },
            });
          var fe = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            pe = new RegExp("^(?:([+-])=|)(" + fe + ")([a-z%]*)$", "i"),
            he = ["Top", "Right", "Bottom", "Left"],
            ge = b.documentElement,
            me = function (e) {
              return $.contains(e.ownerDocument, e);
            },
            ve = { composed: !0 };
          ge.getRootNode &&
            (me = function (e) {
              return (
                $.contains(e.ownerDocument, e) ||
                e.getRootNode(ve) === e.ownerDocument
              );
            });
          var ye = function (e, t) {
            return (
              "none" === (e = t || e).style.display ||
              ("" === e.style.display &&
                me(e) &&
                "none" === $.css(e, "display"))
            );
          };
          function be(e, t, n, o) {
            var r,
              i,
              s = 20,
              a = o
                ? function () {
                    return o.cur();
                  }
                : function () {
                    return $.css(e, t, "");
                  },
              c = a(),
              u = (n && n[3]) || ($.cssNumber[t] ? "" : "px"),
              l =
                e.nodeType &&
                ($.cssNumber[t] || ("px" !== u && +c)) &&
                pe.exec($.css(e, t));
            if (l && l[3] !== u) {
              for (c /= 2, u = u || l[3], l = +c || 1; s--; )
                $.style(e, t, l + u),
                  (1 - i) * (1 - (i = a() / c || 0.5)) <= 0 && (s = 0),
                  (l /= i);
              (l *= 2), $.style(e, t, l + u), (n = n || []);
            }
            return (
              n &&
                ((l = +l || +c || 0),
                (r = n[1] ? l + (n[1] + 1) * n[2] : +n[2]),
                o && ((o.unit = u), (o.start = l), (o.end = r))),
              r
            );
          }
          var we = {};
          function xe(e) {
            var t,
              n = e.ownerDocument,
              o = e.nodeName,
              r = we[o];
            return (
              r ||
              ((t = n.body.appendChild(n.createElement(o))),
              (r = $.css(t, "display")),
              t.parentNode.removeChild(t),
              "none" === r && (r = "block"),
              (we[o] = r),
              r)
            );
          }
          function _e(e, t) {
            for (var n, o, r = [], i = 0, s = e.length; i < s; i++)
              (o = e[i]).style &&
                ((n = o.style.display),
                t
                  ? ("none" === n &&
                      ((r[i] = ae.get(o, "display") || null),
                      r[i] || (o.style.display = "")),
                    "" === o.style.display && ye(o) && (r[i] = xe(o)))
                  : "none" !== n && ((r[i] = "none"), ae.set(o, "display", n)));
            for (i = 0; i < s; i++) null != r[i] && (e[i].style.display = r[i]);
            return e;
          }
          $.fn.extend({
            show: function () {
              return _e(this, !0);
            },
            hide: function () {
              return _e(this);
            },
            toggle: function (e) {
              return "boolean" == typeof e
                ? e
                  ? this.show()
                  : this.hide()
                : this.each(function () {
                    ye(this) ? $(this).show() : $(this).hide();
                  });
            },
          });
          var ke,
            Se,
            $e = /^(?:checkbox|radio)$/i,
            Ee = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
            Te = /^$|^module$|\/(?:java|ecma)script/i;
          (ke = b.createDocumentFragment().appendChild(b.createElement("div"))),
            (Se = b.createElement("input")).setAttribute("type", "radio"),
            Se.setAttribute("checked", "checked"),
            Se.setAttribute("name", "t"),
            ke.appendChild(Se),
            (m.checkClone = ke.cloneNode(!0).cloneNode(!0).lastChild.checked),
            (ke.innerHTML = "<textarea>x</textarea>"),
            (m.noCloneChecked = !!ke.cloneNode(!0).lastChild.defaultValue),
            (ke.innerHTML = "<option></option>"),
            (m.option = !!ke.lastChild);
          var Ce = {
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""],
          };
          function je(e, t) {
            var n;
            return (
              (n =
                void 0 !== e.getElementsByTagName
                  ? e.getElementsByTagName(t || "*")
                  : void 0 !== e.querySelectorAll
                  ? e.querySelectorAll(t || "*")
                  : []),
              void 0 === t || (t && T(e, t)) ? $.merge([e], n) : n
            );
          }
          function qe(e, t) {
            for (var n = 0, o = e.length; n < o; n++)
              ae.set(e[n], "globalEval", !t || ae.get(t[n], "globalEval"));
          }
          (Ce.tbody = Ce.tfoot = Ce.colgroup = Ce.caption = Ce.thead),
            (Ce.th = Ce.td),
            m.option ||
              (Ce.optgroup = Ce.option =
                [1, "<select multiple='multiple'>", "</select>"]);
          var Ae = /<|&#?\w+;/;
          function Pe(e, t, n, o, r) {
            for (
              var i,
                s,
                a,
                c,
                u,
                l,
                d = t.createDocumentFragment(),
                f = [],
                p = 0,
                h = e.length;
              p < h;
              p++
            )
              if ((i = e[p]) || 0 === i)
                if ("object" === _(i)) $.merge(f, i.nodeType ? [i] : i);
                else if (Ae.test(i)) {
                  for (
                    s = s || d.appendChild(t.createElement("div")),
                      a = (Ee.exec(i) || ["", ""])[1].toLowerCase(),
                      c = Ce[a] || Ce._default,
                      s.innerHTML = c[1] + $.htmlPrefilter(i) + c[2],
                      l = c[0];
                    l--;

                  )
                    s = s.lastChild;
                  $.merge(f, s.childNodes),
                    ((s = d.firstChild).textContent = "");
                } else f.push(t.createTextNode(i));
            for (d.textContent = "", p = 0; (i = f[p++]); )
              if (o && $.inArray(i, o) > -1) r && r.push(i);
              else if (
                ((u = me(i)),
                (s = je(d.appendChild(i), "script")),
                u && qe(s),
                n)
              )
                for (l = 0; (i = s[l++]); ) Te.test(i.type || "") && n.push(i);
            return d;
          }
          var Ie = /^([^.]*)(?:\.(.+)|)/;
          function Ne() {
            return !0;
          }
          function Oe() {
            return !1;
          }
          function Le(e, t, n, o, r, i) {
            var s, a;
            if ("object" == typeof t) {
              for (a in ("string" != typeof n && ((o = o || n), (n = void 0)),
              t))
                Le(e, a, n, o, t[a], i);
              return e;
            }
            if (
              (null == o && null == r
                ? ((r = n), (o = n = void 0))
                : null == r &&
                  ("string" == typeof n
                    ? ((r = o), (o = void 0))
                    : ((r = o), (o = n), (n = void 0))),
              !1 === r)
            )
              r = Oe;
            else if (!r) return e;
            return (
              1 === i &&
                ((s = r),
                (r = function (e) {
                  return $().off(e), s.apply(this, arguments);
                }),
                (r.guid = s.guid || (s.guid = $.guid++))),
              e.each(function () {
                $.event.add(this, t, r, o, n);
              })
            );
          }
          function Me(e, t, n) {
            n
              ? (ae.set(e, t, !1),
                $.event.add(e, t, {
                  namespace: !1,
                  handler: function (e) {
                    var n,
                      o = ae.get(this, t);
                    if (1 & e.isTrigger && this[t]) {
                      if (o)
                        ($.event.special[t] || {}).delegateType &&
                          e.stopPropagation();
                      else if (
                        ((o = a.call(arguments)),
                        ae.set(this, t, o),
                        this[t](),
                        (n = ae.get(this, t)),
                        ae.set(this, t, !1),
                        o !== n)
                      )
                        return (
                          e.stopImmediatePropagation(), e.preventDefault(), n
                        );
                    } else
                      o &&
                        (ae.set(
                          this,
                          t,
                          $.event.trigger(o[0], o.slice(1), this)
                        ),
                        e.stopPropagation(),
                        (e.isImmediatePropagationStopped = Ne));
                  },
                }))
              : void 0 === ae.get(e, t) && $.event.add(e, t, Ne);
          }
          ($.event = {
            global: {},
            add: function (e, t, n, o, r) {
              var i,
                s,
                a,
                c,
                u,
                l,
                d,
                f,
                p,
                h,
                g,
                m = ae.get(e);
              if (ie(e))
                for (
                  n.handler && ((n = (i = n).handler), (r = i.selector)),
                    r && $.find.matchesSelector(ge, r),
                    n.guid || (n.guid = $.guid++),
                    (c = m.events) || (c = m.events = Object.create(null)),
                    (s = m.handle) ||
                      (s = m.handle =
                        function (t) {
                          return void 0 !== $ && $.event.triggered !== t.type
                            ? $.event.dispatch.apply(e, arguments)
                            : void 0;
                        }),
                    u = (t = (t || "").match(z) || [""]).length;
                  u--;

                )
                  (p = g = (a = Ie.exec(t[u]) || [])[1]),
                    (h = (a[2] || "").split(".").sort()),
                    p &&
                      ((d = $.event.special[p] || {}),
                      (p = (r ? d.delegateType : d.bindType) || p),
                      (d = $.event.special[p] || {}),
                      (l = $.extend(
                        {
                          type: p,
                          origType: g,
                          data: o,
                          handler: n,
                          guid: n.guid,
                          selector: r,
                          needsContext: r && $.expr.match.needsContext.test(r),
                          namespace: h.join("."),
                        },
                        i
                      )),
                      (f = c[p]) ||
                        (((f = c[p] = []).delegateCount = 0),
                        (d.setup && !1 !== d.setup.call(e, o, h, s)) ||
                          (e.addEventListener && e.addEventListener(p, s))),
                      d.add &&
                        (d.add.call(e, l),
                        l.handler.guid || (l.handler.guid = n.guid)),
                      r ? f.splice(f.delegateCount++, 0, l) : f.push(l),
                      ($.event.global[p] = !0));
            },
            remove: function (e, t, n, o, r) {
              var i,
                s,
                a,
                c,
                u,
                l,
                d,
                f,
                p,
                h,
                g,
                m = ae.hasData(e) && ae.get(e);
              if (m && (c = m.events)) {
                for (u = (t = (t || "").match(z) || [""]).length; u--; )
                  if (
                    ((p = g = (a = Ie.exec(t[u]) || [])[1]),
                    (h = (a[2] || "").split(".").sort()),
                    p)
                  ) {
                    for (
                      d = $.event.special[p] || {},
                        f =
                          c[(p = (o ? d.delegateType : d.bindType) || p)] || [],
                        a =
                          a[2] &&
                          new RegExp(
                            "(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"
                          ),
                        s = i = f.length;
                      i--;

                    )
                      (l = f[i]),
                        (!r && g !== l.origType) ||
                          (n && n.guid !== l.guid) ||
                          (a && !a.test(l.namespace)) ||
                          (o &&
                            o !== l.selector &&
                            ("**" !== o || !l.selector)) ||
                          (f.splice(i, 1),
                          l.selector && f.delegateCount--,
                          d.remove && d.remove.call(e, l));
                    s &&
                      !f.length &&
                      ((d.teardown && !1 !== d.teardown.call(e, h, m.handle)) ||
                        $.removeEvent(e, p, m.handle),
                      delete c[p]);
                  } else for (p in c) $.event.remove(e, p + t[u], n, o, !0);
                $.isEmptyObject(c) && ae.remove(e, "handle events");
              }
            },
            dispatch: function (e) {
              var t,
                n,
                o,
                r,
                i,
                s,
                a = new Array(arguments.length),
                c = $.event.fix(e),
                u =
                  (ae.get(this, "events") || Object.create(null))[c.type] || [],
                l = $.event.special[c.type] || {};
              for (a[0] = c, t = 1; t < arguments.length; t++)
                a[t] = arguments[t];
              if (
                ((c.delegateTarget = this),
                !l.preDispatch || !1 !== l.preDispatch.call(this, c))
              ) {
                for (
                  s = $.event.handlers.call(this, c, u), t = 0;
                  (r = s[t++]) && !c.isPropagationStopped();

                )
                  for (
                    c.currentTarget = r.elem, n = 0;
                    (i = r.handlers[n++]) && !c.isImmediatePropagationStopped();

                  )
                    (c.rnamespace &&
                      !1 !== i.namespace &&
                      !c.rnamespace.test(i.namespace)) ||
                      ((c.handleObj = i),
                      (c.data = i.data),
                      void 0 !==
                        (o = (
                          ($.event.special[i.origType] || {}).handle ||
                          i.handler
                        ).apply(r.elem, a)) &&
                        !1 === (c.result = o) &&
                        (c.preventDefault(), c.stopPropagation()));
                return l.postDispatch && l.postDispatch.call(this, c), c.result;
              }
            },
            handlers: function (e, t) {
              var n,
                o,
                r,
                i,
                s,
                a = [],
                c = t.delegateCount,
                u = e.target;
              if (c && u.nodeType && !("click" === e.type && e.button >= 1))
                for (; u !== this; u = u.parentNode || this)
                  if (
                    1 === u.nodeType &&
                    ("click" !== e.type || !0 !== u.disabled)
                  ) {
                    for (i = [], s = {}, n = 0; n < c; n++)
                      void 0 === s[(r = (o = t[n]).selector + " ")] &&
                        (s[r] = o.needsContext
                          ? $(r, this).index(u) > -1
                          : $.find(r, this, null, [u]).length),
                        s[r] && i.push(o);
                    i.length && a.push({ elem: u, handlers: i });
                  }
              return (
                (u = this),
                c < t.length && a.push({ elem: u, handlers: t.slice(c) }),
                a
              );
            },
            addProp: function (e, t) {
              Object.defineProperty($.Event.prototype, e, {
                enumerable: !0,
                configurable: !0,
                get: v(t)
                  ? function () {
                      if (this.originalEvent) return t(this.originalEvent);
                    }
                  : function () {
                      if (this.originalEvent) return this.originalEvent[e];
                    },
                set: function (t) {
                  Object.defineProperty(this, e, {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: t,
                  });
                },
              });
            },
            fix: function (e) {
              return e[$.expando] ? e : new $.Event(e);
            },
            special: {
              load: { noBubble: !0 },
              click: {
                setup: function (e) {
                  var t = this || e;
                  return (
                    $e.test(t.type) &&
                      t.click &&
                      T(t, "input") &&
                      Me(t, "click", !0),
                    !1
                  );
                },
                trigger: function (e) {
                  var t = this || e;
                  return (
                    $e.test(t.type) &&
                      t.click &&
                      T(t, "input") &&
                      Me(t, "click"),
                    !0
                  );
                },
                _default: function (e) {
                  var t = e.target;
                  return (
                    ($e.test(t.type) &&
                      t.click &&
                      T(t, "input") &&
                      ae.get(t, "click")) ||
                    T(t, "a")
                  );
                },
              },
              beforeunload: {
                postDispatch: function (e) {
                  void 0 !== e.result &&
                    e.originalEvent &&
                    (e.originalEvent.returnValue = e.result);
                },
              },
            },
          }),
            ($.removeEvent = function (e, t, n) {
              e.removeEventListener && e.removeEventListener(t, n);
            }),
            ($.Event = function (e, t) {
              if (!(this instanceof $.Event)) return new $.Event(e, t);
              e && e.type
                ? ((this.originalEvent = e),
                  (this.type = e.type),
                  (this.isDefaultPrevented =
                    e.defaultPrevented ||
                    (void 0 === e.defaultPrevented && !1 === e.returnValue)
                      ? Ne
                      : Oe),
                  (this.target =
                    e.target && 3 === e.target.nodeType
                      ? e.target.parentNode
                      : e.target),
                  (this.currentTarget = e.currentTarget),
                  (this.relatedTarget = e.relatedTarget))
                : (this.type = e),
                t && $.extend(this, t),
                (this.timeStamp = (e && e.timeStamp) || Date.now()),
                (this[$.expando] = !0);
            }),
            ($.Event.prototype = {
              constructor: $.Event,
              isDefaultPrevented: Oe,
              isPropagationStopped: Oe,
              isImmediatePropagationStopped: Oe,
              isSimulated: !1,
              preventDefault: function () {
                var e = this.originalEvent;
                (this.isDefaultPrevented = Ne),
                  e && !this.isSimulated && e.preventDefault();
              },
              stopPropagation: function () {
                var e = this.originalEvent;
                (this.isPropagationStopped = Ne),
                  e && !this.isSimulated && e.stopPropagation();
              },
              stopImmediatePropagation: function () {
                var e = this.originalEvent;
                (this.isImmediatePropagationStopped = Ne),
                  e && !this.isSimulated && e.stopImmediatePropagation(),
                  this.stopPropagation();
              },
            }),
            $.each(
              {
                altKey: !0,
                bubbles: !0,
                cancelable: !0,
                changedTouches: !0,
                ctrlKey: !0,
                detail: !0,
                eventPhase: !0,
                metaKey: !0,
                pageX: !0,
                pageY: !0,
                shiftKey: !0,
                view: !0,
                char: !0,
                code: !0,
                charCode: !0,
                key: !0,
                keyCode: !0,
                button: !0,
                buttons: !0,
                clientX: !0,
                clientY: !0,
                offsetX: !0,
                offsetY: !0,
                pointerId: !0,
                pointerType: !0,
                screenX: !0,
                screenY: !0,
                targetTouches: !0,
                toElement: !0,
                touches: !0,
                which: !0,
              },
              $.event.addProp
            ),
            $.each({ focus: "focusin", blur: "focusout" }, function (e, t) {
              function n(e) {
                if (b.documentMode) {
                  var n = ae.get(this, "handle"),
                    o = $.event.fix(e);
                  (o.type = "focusin" === e.type ? "focus" : "blur"),
                    (o.isSimulated = !0),
                    n(e),
                    o.target === o.currentTarget && n(o);
                } else $.event.simulate(t, e.target, $.event.fix(e));
              }
              ($.event.special[e] = {
                setup: function () {
                  var o;
                  if ((Me(this, e, !0), !b.documentMode)) return !1;
                  (o = ae.get(this, t)) || this.addEventListener(t, n),
                    ae.set(this, t, (o || 0) + 1);
                },
                trigger: function () {
                  return Me(this, e), !0;
                },
                teardown: function () {
                  var e;
                  if (!b.documentMode) return !1;
                  (e = ae.get(this, t) - 1)
                    ? ae.set(this, t, e)
                    : (this.removeEventListener(t, n), ae.remove(this, t));
                },
                _default: function (t) {
                  return ae.get(t.target, e);
                },
                delegateType: t,
              }),
                ($.event.special[t] = {
                  setup: function () {
                    var o = this.ownerDocument || this.document || this,
                      r = b.documentMode ? this : o,
                      i = ae.get(r, t);
                    i ||
                      (b.documentMode
                        ? this.addEventListener(t, n)
                        : o.addEventListener(e, n, !0)),
                      ae.set(r, t, (i || 0) + 1);
                  },
                  teardown: function () {
                    var o = this.ownerDocument || this.document || this,
                      r = b.documentMode ? this : o,
                      i = ae.get(r, t) - 1;
                    i
                      ? ae.set(r, t, i)
                      : (b.documentMode
                          ? this.removeEventListener(t, n)
                          : o.removeEventListener(e, n, !0),
                        ae.remove(r, t));
                  },
                });
            }),
            $.each(
              {
                mouseenter: "mouseover",
                mouseleave: "mouseout",
                pointerenter: "pointerover",
                pointerleave: "pointerout",
              },
              function (e, t) {
                $.event.special[e] = {
                  delegateType: t,
                  bindType: t,
                  handle: function (e) {
                    var n,
                      o = e.relatedTarget,
                      r = e.handleObj;
                    return (
                      (o && (o === this || $.contains(this, o))) ||
                        ((e.type = r.origType),
                        (n = r.handler.apply(this, arguments)),
                        (e.type = t)),
                      n
                    );
                  },
                };
              }
            ),
            $.fn.extend({
              on: function (e, t, n, o) {
                return Le(this, e, t, n, o);
              },
              one: function (e, t, n, o) {
                return Le(this, e, t, n, o, 1);
              },
              off: function (e, t, n) {
                var o, r;
                if (e && e.preventDefault && e.handleObj)
                  return (
                    (o = e.handleObj),
                    $(e.delegateTarget).off(
                      o.namespace ? o.origType + "." + o.namespace : o.origType,
                      o.selector,
                      o.handler
                    ),
                    this
                  );
                if ("object" == typeof e) {
                  for (r in e) this.off(r, t, e[r]);
                  return this;
                }
                return (
                  (!1 !== t && "function" != typeof t) ||
                    ((n = t), (t = void 0)),
                  !1 === n && (n = Oe),
                  this.each(function () {
                    $.event.remove(this, e, n, t);
                  })
                );
              },
            });
          var Re = /<script|<style|<link/i,
            De = /checked\s*(?:[^=]|=\s*.checked.)/i,
            He = /^\s*<!\[CDATA\[|\]\]>\s*$/g;
          function Fe(e, t) {
            return (
              (T(e, "table") &&
                T(11 !== t.nodeType ? t : t.firstChild, "tr") &&
                $(e).children("tbody")[0]) ||
              e
            );
          }
          function Qe(e) {
            return (
              (e.type = (null !== e.getAttribute("type")) + "/" + e.type), e
            );
          }
          function Be(e) {
            return (
              "true/" === (e.type || "").slice(0, 5)
                ? (e.type = e.type.slice(5))
                : e.removeAttribute("type"),
              e
            );
          }
          function We(e, t) {
            var n, o, r, i, s, a;
            if (1 === t.nodeType) {
              if (ae.hasData(e) && (a = ae.get(e).events))
                for (r in (ae.remove(t, "handle events"), a))
                  for (n = 0, o = a[r].length; n < o; n++)
                    $.event.add(t, r, a[r][n]);
              ce.hasData(e) &&
                ((i = ce.access(e)), (s = $.extend({}, i)), ce.set(t, s));
            }
          }
          function Ve(e, t) {
            var n = t.nodeName.toLowerCase();
            "input" === n && $e.test(e.type)
              ? (t.checked = e.checked)
              : ("input" !== n && "textarea" !== n) ||
                (t.defaultValue = e.defaultValue);
          }
          function Ue(e, t, n, o) {
            t = c(t);
            var r,
              i,
              s,
              a,
              u,
              l,
              d = 0,
              f = e.length,
              p = f - 1,
              h = t[0],
              g = v(h);
            if (
              g ||
              (f > 1 && "string" == typeof h && !m.checkClone && De.test(h))
            )
              return e.each(function (r) {
                var i = e.eq(r);
                g && (t[0] = h.call(this, r, i.html())), Ue(i, t, n, o);
              });
            if (
              f &&
              ((i = (r = Pe(t, e[0].ownerDocument, !1, e, o)).firstChild),
              1 === r.childNodes.length && (r = i),
              i || o)
            ) {
              for (a = (s = $.map(je(r, "script"), Qe)).length; d < f; d++)
                (u = r),
                  d !== p &&
                    ((u = $.clone(u, !0, !0)),
                    a && $.merge(s, je(u, "script"))),
                  n.call(e[d], u, d);
              if (a)
                for (
                  l = s[s.length - 1].ownerDocument, $.map(s, Be), d = 0;
                  d < a;
                  d++
                )
                  (u = s[d]),
                    Te.test(u.type || "") &&
                      !ae.access(u, "globalEval") &&
                      $.contains(l, u) &&
                      (u.src && "module" !== (u.type || "").toLowerCase()
                        ? $._evalUrl &&
                          !u.noModule &&
                          $._evalUrl(
                            u.src,
                            { nonce: u.nonce || u.getAttribute("nonce") },
                            l
                          )
                        : x(u.textContent.replace(He, ""), u, l));
            }
            return e;
          }
          function ze(e, t, n) {
            for (
              var o, r = t ? $.filter(t, e) : e, i = 0;
              null != (o = r[i]);
              i++
            )
              n || 1 !== o.nodeType || $.cleanData(je(o)),
                o.parentNode &&
                  (n && me(o) && qe(je(o, "script")),
                  o.parentNode.removeChild(o));
            return e;
          }
          $.extend({
            htmlPrefilter: function (e) {
              return e;
            },
            clone: function (e, t, n) {
              var o,
                r,
                i,
                s,
                a = e.cloneNode(!0),
                c = me(e);
              if (
                !(
                  m.noCloneChecked ||
                  (1 !== e.nodeType && 11 !== e.nodeType) ||
                  $.isXMLDoc(e)
                )
              )
                for (s = je(a), o = 0, r = (i = je(e)).length; o < r; o++)
                  Ve(i[o], s[o]);
              if (t)
                if (n)
                  for (
                    i = i || je(e), s = s || je(a), o = 0, r = i.length;
                    o < r;
                    o++
                  )
                    We(i[o], s[o]);
                else We(e, a);
              return (
                (s = je(a, "script")).length > 0 &&
                  qe(s, !c && je(e, "script")),
                a
              );
            },
            cleanData: function (e) {
              for (
                var t, n, o, r = $.event.special, i = 0;
                void 0 !== (n = e[i]);
                i++
              )
                if (ie(n)) {
                  if ((t = n[ae.expando])) {
                    if (t.events)
                      for (o in t.events)
                        r[o]
                          ? $.event.remove(n, o)
                          : $.removeEvent(n, o, t.handle);
                    n[ae.expando] = void 0;
                  }
                  n[ce.expando] && (n[ce.expando] = void 0);
                }
            },
          }),
            $.fn.extend({
              detach: function (e) {
                return ze(this, e, !0);
              },
              remove: function (e) {
                return ze(this, e);
              },
              text: function (e) {
                return ee(
                  this,
                  function (e) {
                    return void 0 === e
                      ? $.text(this)
                      : this.empty().each(function () {
                          (1 !== this.nodeType &&
                            11 !== this.nodeType &&
                            9 !== this.nodeType) ||
                            (this.textContent = e);
                        });
                  },
                  null,
                  e,
                  arguments.length
                );
              },
              append: function () {
                return Ue(this, arguments, function (e) {
                  (1 !== this.nodeType &&
                    11 !== this.nodeType &&
                    9 !== this.nodeType) ||
                    Fe(this, e).appendChild(e);
                });
              },
              prepend: function () {
                return Ue(this, arguments, function (e) {
                  if (
                    1 === this.nodeType ||
                    11 === this.nodeType ||
                    9 === this.nodeType
                  ) {
                    var t = Fe(this, e);
                    t.insertBefore(e, t.firstChild);
                  }
                });
              },
              before: function () {
                return Ue(this, arguments, function (e) {
                  this.parentNode && this.parentNode.insertBefore(e, this);
                });
              },
              after: function () {
                return Ue(this, arguments, function (e) {
                  this.parentNode &&
                    this.parentNode.insertBefore(e, this.nextSibling);
                });
              },
              empty: function () {
                for (var e, t = 0; null != (e = this[t]); t++)
                  1 === e.nodeType &&
                    ($.cleanData(je(e, !1)), (e.textContent = ""));
                return this;
              },
              clone: function (e, t) {
                return (
                  (e = null != e && e),
                  (t = null == t ? e : t),
                  this.map(function () {
                    return $.clone(this, e, t);
                  })
                );
              },
              html: function (e) {
                return ee(
                  this,
                  function (e) {
                    var t = this[0] || {},
                      n = 0,
                      o = this.length;
                    if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                    if (
                      "string" == typeof e &&
                      !Re.test(e) &&
                      !Ce[(Ee.exec(e) || ["", ""])[1].toLowerCase()]
                    ) {
                      e = $.htmlPrefilter(e);
                      try {
                        for (; n < o; n++)
                          1 === (t = this[n] || {}).nodeType &&
                            ($.cleanData(je(t, !1)), (t.innerHTML = e));
                        t = 0;
                      } catch (e) {}
                    }
                    t && this.empty().append(e);
                  },
                  null,
                  e,
                  arguments.length
                );
              },
              replaceWith: function () {
                var e = [];
                return Ue(
                  this,
                  arguments,
                  function (t) {
                    var n = this.parentNode;
                    $.inArray(this, e) < 0 &&
                      ($.cleanData(je(this)), n && n.replaceChild(t, this));
                  },
                  e
                );
              },
            }),
            $.each(
              {
                appendTo: "append",
                prependTo: "prepend",
                insertBefore: "before",
                insertAfter: "after",
                replaceAll: "replaceWith",
              },
              function (e, t) {
                $.fn[e] = function (e) {
                  for (
                    var n, o = [], r = $(e), i = r.length - 1, s = 0;
                    s <= i;
                    s++
                  )
                    (n = s === i ? this : this.clone(!0)),
                      $(r[s])[t](n),
                      u.apply(o, n.get());
                  return this.pushStack(o);
                };
              }
            );
          var Je = new RegExp("^(" + fe + ")(?!px)[a-z%]+$", "i"),
            Xe = /^--/,
            Ge = function (e) {
              var t = e.ownerDocument.defaultView;
              return (t && t.opener) || (t = o), t.getComputedStyle(e);
            },
            Ye = function (e, t, n) {
              var o,
                r,
                i = {};
              for (r in t) (i[r] = e.style[r]), (e.style[r] = t[r]);
              for (r in ((o = n.call(e)), t)) e.style[r] = i[r];
              return o;
            },
            Ke = new RegExp(he.join("|"), "i");
          function Ze(e, t, n) {
            var o,
              r,
              i,
              s,
              a = Xe.test(t),
              c = e.style;
            return (
              (n = n || Ge(e)) &&
                ((s = n.getPropertyValue(t) || n[t]),
                a && s && (s = s.replace(P, "$1") || void 0),
                "" !== s || me(e) || (s = $.style(e, t)),
                !m.pixelBoxStyles() &&
                  Je.test(s) &&
                  Ke.test(t) &&
                  ((o = c.width),
                  (r = c.minWidth),
                  (i = c.maxWidth),
                  (c.minWidth = c.maxWidth = c.width = s),
                  (s = n.width),
                  (c.width = o),
                  (c.minWidth = r),
                  (c.maxWidth = i))),
              void 0 !== s ? s + "" : s
            );
          }
          function et(e, t) {
            return {
              get: function () {
                if (!e()) return (this.get = t).apply(this, arguments);
                delete this.get;
              },
            };
          }
          !(function () {
            function e() {
              if (l) {
                (u.style.cssText =
                  "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0"),
                  (l.style.cssText =
                    "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%"),
                  ge.appendChild(u).appendChild(l);
                var e = o.getComputedStyle(l);
                (n = "1%" !== e.top),
                  (c = 12 === t(e.marginLeft)),
                  (l.style.right = "60%"),
                  (s = 36 === t(e.right)),
                  (r = 36 === t(e.width)),
                  (l.style.position = "absolute"),
                  (i = 12 === t(l.offsetWidth / 3)),
                  ge.removeChild(u),
                  (l = null);
              }
            }
            function t(e) {
              return Math.round(parseFloat(e));
            }
            var n,
              r,
              i,
              s,
              a,
              c,
              u = b.createElement("div"),
              l = b.createElement("div");
            l.style &&
              ((l.style.backgroundClip = "content-box"),
              (l.cloneNode(!0).style.backgroundClip = ""),
              (m.clearCloneStyle = "content-box" === l.style.backgroundClip),
              $.extend(m, {
                boxSizingReliable: function () {
                  return e(), r;
                },
                pixelBoxStyles: function () {
                  return e(), s;
                },
                pixelPosition: function () {
                  return e(), n;
                },
                reliableMarginLeft: function () {
                  return e(), c;
                },
                scrollboxSize: function () {
                  return e(), i;
                },
                reliableTrDimensions: function () {
                  var e, t, n, r;
                  return (
                    null == a &&
                      ((e = b.createElement("table")),
                      (t = b.createElement("tr")),
                      (n = b.createElement("div")),
                      (e.style.cssText =
                        "position:absolute;left:-11111px;border-collapse:separate"),
                      (t.style.cssText =
                        "box-sizing:content-box;border:1px solid"),
                      (t.style.height = "1px"),
                      (n.style.height = "9px"),
                      (n.style.display = "block"),
                      ge.appendChild(e).appendChild(t).appendChild(n),
                      (r = o.getComputedStyle(t)),
                      (a =
                        parseInt(r.height, 10) +
                          parseInt(r.borderTopWidth, 10) +
                          parseInt(r.borderBottomWidth, 10) ===
                        t.offsetHeight),
                      ge.removeChild(e)),
                    a
                  );
                },
              }));
          })();
          var tt = ["Webkit", "Moz", "ms"],
            nt = b.createElement("div").style,
            ot = {};
          function rt(e) {
            return (
              $.cssProps[e] ||
              ot[e] ||
              (e in nt
                ? e
                : (ot[e] =
                    (function (e) {
                      for (
                        var t = e[0].toUpperCase() + e.slice(1), n = tt.length;
                        n--;

                      )
                        if ((e = tt[n] + t) in nt) return e;
                    })(e) || e))
            );
          }
          var it = /^(none|table(?!-c[ea]).+)/,
            st = {
              position: "absolute",
              visibility: "hidden",
              display: "block",
            },
            at = { letterSpacing: "0", fontWeight: "400" };
          function ct(e, t, n) {
            var o = pe.exec(t);
            return o ? Math.max(0, o[2] - (n || 0)) + (o[3] || "px") : t;
          }
          function ut(e, t, n, o, r, i) {
            var s = "width" === t ? 1 : 0,
              a = 0,
              c = 0,
              u = 0;
            if (n === (o ? "border" : "content")) return 0;
            for (; s < 4; s += 2)
              "margin" === n && (u += $.css(e, n + he[s], !0, r)),
                o
                  ? ("content" === n &&
                      (c -= $.css(e, "padding" + he[s], !0, r)),
                    "margin" !== n &&
                      (c -= $.css(e, "border" + he[s] + "Width", !0, r)))
                  : ((c += $.css(e, "padding" + he[s], !0, r)),
                    "padding" !== n
                      ? (c += $.css(e, "border" + he[s] + "Width", !0, r))
                      : (a += $.css(e, "border" + he[s] + "Width", !0, r)));
            return (
              !o &&
                i >= 0 &&
                (c +=
                  Math.max(
                    0,
                    Math.ceil(
                      e["offset" + t[0].toUpperCase() + t.slice(1)] -
                        i -
                        c -
                        a -
                        0.5
                    )
                  ) || 0),
              c + u
            );
          }
          function lt(e, t, n) {
            var o = Ge(e),
              r =
                (!m.boxSizingReliable() || n) &&
                "border-box" === $.css(e, "boxSizing", !1, o),
              i = r,
              s = Ze(e, t, o),
              a = "offset" + t[0].toUpperCase() + t.slice(1);
            if (Je.test(s)) {
              if (!n) return s;
              s = "auto";
            }
            return (
              ((!m.boxSizingReliable() && r) ||
                (!m.reliableTrDimensions() && T(e, "tr")) ||
                "auto" === s ||
                (!parseFloat(s) && "inline" === $.css(e, "display", !1, o))) &&
                e.getClientRects().length &&
                ((r = "border-box" === $.css(e, "boxSizing", !1, o)),
                (i = a in e) && (s = e[a])),
              (s = parseFloat(s) || 0) +
                ut(e, t, n || (r ? "border" : "content"), i, o, s) +
                "px"
            );
          }
          function dt(e, t, n, o, r) {
            return new dt.prototype.init(e, t, n, o, r);
          }
          $.extend({
            cssHooks: {
              opacity: {
                get: function (e, t) {
                  if (t) {
                    var n = Ze(e, "opacity");
                    return "" === n ? "1" : n;
                  }
                },
              },
            },
            cssNumber: {
              animationIterationCount: !0,
              aspectRatio: !0,
              borderImageSlice: !0,
              columnCount: !0,
              flexGrow: !0,
              flexShrink: !0,
              fontWeight: !0,
              gridArea: !0,
              gridColumn: !0,
              gridColumnEnd: !0,
              gridColumnStart: !0,
              gridRow: !0,
              gridRowEnd: !0,
              gridRowStart: !0,
              lineHeight: !0,
              opacity: !0,
              order: !0,
              orphans: !0,
              scale: !0,
              widows: !0,
              zIndex: !0,
              zoom: !0,
              fillOpacity: !0,
              floodOpacity: !0,
              stopOpacity: !0,
              strokeMiterlimit: !0,
              strokeOpacity: !0,
            },
            cssProps: {},
            style: function (e, t, n, o) {
              if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var r,
                  i,
                  s,
                  a = re(t),
                  c = Xe.test(t),
                  u = e.style;
                if (
                  (c || (t = rt(a)),
                  (s = $.cssHooks[t] || $.cssHooks[a]),
                  void 0 === n)
                )
                  return s && "get" in s && void 0 !== (r = s.get(e, !1, o))
                    ? r
                    : u[t];
                "string" == (i = typeof n) &&
                  (r = pe.exec(n)) &&
                  r[1] &&
                  ((n = be(e, t, r)), (i = "number")),
                  null != n &&
                    n == n &&
                    ("number" !== i ||
                      c ||
                      (n += (r && r[3]) || ($.cssNumber[a] ? "" : "px")),
                    m.clearCloneStyle ||
                      "" !== n ||
                      0 !== t.indexOf("background") ||
                      (u[t] = "inherit"),
                    (s && "set" in s && void 0 === (n = s.set(e, n, o))) ||
                      (c ? u.setProperty(t, n) : (u[t] = n)));
              }
            },
            css: function (e, t, n, o) {
              var r,
                i,
                s,
                a = re(t);
              return (
                Xe.test(t) || (t = rt(a)),
                (s = $.cssHooks[t] || $.cssHooks[a]) &&
                  "get" in s &&
                  (r = s.get(e, !0, n)),
                void 0 === r && (r = Ze(e, t, o)),
                "normal" === r && t in at && (r = at[t]),
                "" === n || n
                  ? ((i = parseFloat(r)), !0 === n || isFinite(i) ? i || 0 : r)
                  : r
              );
            },
          }),
            $.each(["height", "width"], function (e, t) {
              $.cssHooks[t] = {
                get: function (e, n, o) {
                  if (n)
                    return !it.test($.css(e, "display")) ||
                      (e.getClientRects().length &&
                        e.getBoundingClientRect().width)
                      ? lt(e, t, o)
                      : Ye(e, st, function () {
                          return lt(e, t, o);
                        });
                },
                set: function (e, n, o) {
                  var r,
                    i = Ge(e),
                    s = !m.scrollboxSize() && "absolute" === i.position,
                    a =
                      (s || o) && "border-box" === $.css(e, "boxSizing", !1, i),
                    c = o ? ut(e, t, o, a, i) : 0;
                  return (
                    a &&
                      s &&
                      (c -= Math.ceil(
                        e["offset" + t[0].toUpperCase() + t.slice(1)] -
                          parseFloat(i[t]) -
                          ut(e, t, "border", !1, i) -
                          0.5
                      )),
                    c &&
                      (r = pe.exec(n)) &&
                      "px" !== (r[3] || "px") &&
                      ((e.style[t] = n), (n = $.css(e, t))),
                    ct(0, n, c)
                  );
                },
              };
            }),
            ($.cssHooks.marginLeft = et(m.reliableMarginLeft, function (e, t) {
              if (t)
                return (
                  (parseFloat(Ze(e, "marginLeft")) ||
                    e.getBoundingClientRect().left -
                      Ye(e, { marginLeft: 0 }, function () {
                        return e.getBoundingClientRect().left;
                      })) + "px"
                );
            })),
            $.each(
              { margin: "", padding: "", border: "Width" },
              function (e, t) {
                ($.cssHooks[e + t] = {
                  expand: function (n) {
                    for (
                      var o = 0,
                        r = {},
                        i = "string" == typeof n ? n.split(" ") : [n];
                      o < 4;
                      o++
                    )
                      r[e + he[o] + t] = i[o] || i[o - 2] || i[0];
                    return r;
                  },
                }),
                  "margin" !== e && ($.cssHooks[e + t].set = ct);
              }
            ),
            $.fn.extend({
              css: function (e, t) {
                return ee(
                  this,
                  function (e, t, n) {
                    var o,
                      r,
                      i = {},
                      s = 0;
                    if (Array.isArray(t)) {
                      for (o = Ge(e), r = t.length; s < r; s++)
                        i[t[s]] = $.css(e, t[s], !1, o);
                      return i;
                    }
                    return void 0 !== n ? $.style(e, t, n) : $.css(e, t);
                  },
                  e,
                  t,
                  arguments.length > 1
                );
              },
            }),
            ($.Tween = dt),
            (dt.prototype = {
              constructor: dt,
              init: function (e, t, n, o, r, i) {
                (this.elem = e),
                  (this.prop = n),
                  (this.easing = r || $.easing._default),
                  (this.options = t),
                  (this.start = this.now = this.cur()),
                  (this.end = o),
                  (this.unit = i || ($.cssNumber[n] ? "" : "px"));
              },
              cur: function () {
                var e = dt.propHooks[this.prop];
                return e && e.get
                  ? e.get(this)
                  : dt.propHooks._default.get(this);
              },
              run: function (e) {
                var t,
                  n = dt.propHooks[this.prop];
                return (
                  this.options.duration
                    ? (this.pos = t =
                        $.easing[this.easing](
                          e,
                          this.options.duration * e,
                          0,
                          1,
                          this.options.duration
                        ))
                    : (this.pos = t = e),
                  (this.now = (this.end - this.start) * t + this.start),
                  this.options.step &&
                    this.options.step.call(this.elem, this.now, this),
                  n && n.set ? n.set(this) : dt.propHooks._default.set(this),
                  this
                );
              },
            }),
            (dt.prototype.init.prototype = dt.prototype),
            (dt.propHooks = {
              _default: {
                get: function (e) {
                  var t;
                  return 1 !== e.elem.nodeType ||
                    (null != e.elem[e.prop] && null == e.elem.style[e.prop])
                    ? e.elem[e.prop]
                    : (t = $.css(e.elem, e.prop, "")) && "auto" !== t
                    ? t
                    : 0;
                },
                set: function (e) {
                  $.fx.step[e.prop]
                    ? $.fx.step[e.prop](e)
                    : 1 !== e.elem.nodeType ||
                      (!$.cssHooks[e.prop] && null == e.elem.style[rt(e.prop)])
                    ? (e.elem[e.prop] = e.now)
                    : $.style(e.elem, e.prop, e.now + e.unit);
                },
              },
            }),
            (dt.propHooks.scrollTop = dt.propHooks.scrollLeft =
              {
                set: function (e) {
                  e.elem.nodeType &&
                    e.elem.parentNode &&
                    (e.elem[e.prop] = e.now);
                },
              }),
            ($.easing = {
              linear: function (e) {
                return e;
              },
              swing: function (e) {
                return 0.5 - Math.cos(e * Math.PI) / 2;
              },
              _default: "swing",
            }),
            ($.fx = dt.prototype.init),
            ($.fx.step = {});
          var ft,
            pt,
            ht = /^(?:toggle|show|hide)$/,
            gt = /queueHooks$/;
          function mt() {
            pt &&
              (!1 === b.hidden && o.requestAnimationFrame
                ? o.requestAnimationFrame(mt)
                : o.setTimeout(mt, $.fx.interval),
              $.fx.tick());
          }
          function vt() {
            return (
              o.setTimeout(function () {
                ft = void 0;
              }),
              (ft = Date.now())
            );
          }
          function yt(e, t) {
            var n,
              o = 0,
              r = { height: e };
            for (t = t ? 1 : 0; o < 4; o += 2 - t)
              r["margin" + (n = he[o])] = r["padding" + n] = e;
            return t && (r.opacity = r.width = e), r;
          }
          function bt(e, t, n) {
            for (
              var o,
                r = (wt.tweeners[t] || []).concat(wt.tweeners["*"]),
                i = 0,
                s = r.length;
              i < s;
              i++
            )
              if ((o = r[i].call(n, t, e))) return o;
          }
          function wt(e, t, n) {
            var o,
              r,
              i = 0,
              s = wt.prefilters.length,
              a = $.Deferred().always(function () {
                delete c.elem;
              }),
              c = function () {
                if (r) return !1;
                for (
                  var t = ft || vt(),
                    n = Math.max(0, u.startTime + u.duration - t),
                    o = 1 - (n / u.duration || 0),
                    i = 0,
                    s = u.tweens.length;
                  i < s;
                  i++
                )
                  u.tweens[i].run(o);
                return (
                  a.notifyWith(e, [u, o, n]),
                  o < 1 && s
                    ? n
                    : (s || a.notifyWith(e, [u, 1, 0]),
                      a.resolveWith(e, [u]),
                      !1)
                );
              },
              u = a.promise({
                elem: e,
                props: $.extend({}, t),
                opts: $.extend(
                  !0,
                  { specialEasing: {}, easing: $.easing._default },
                  n
                ),
                originalProperties: t,
                originalOptions: n,
                startTime: ft || vt(),
                duration: n.duration,
                tweens: [],
                createTween: function (t, n) {
                  var o = $.Tween(
                    e,
                    u.opts,
                    t,
                    n,
                    u.opts.specialEasing[t] || u.opts.easing
                  );
                  return u.tweens.push(o), o;
                },
                stop: function (t) {
                  var n = 0,
                    o = t ? u.tweens.length : 0;
                  if (r) return this;
                  for (r = !0; n < o; n++) u.tweens[n].run(1);
                  return (
                    t
                      ? (a.notifyWith(e, [u, 1, 0]), a.resolveWith(e, [u, t]))
                      : a.rejectWith(e, [u, t]),
                    this
                  );
                },
              }),
              l = u.props;
            for (
              (function (e, t) {
                var n, o, r, i, s;
                for (n in e)
                  if (
                    ((r = t[(o = re(n))]),
                    (i = e[n]),
                    Array.isArray(i) && ((r = i[1]), (i = e[n] = i[0])),
                    n !== o && ((e[o] = i), delete e[n]),
                    (s = $.cssHooks[o]) && ("expand" in s))
                  )
                    for (n in ((i = s.expand(i)), delete e[o], i))
                      (n in e) || ((e[n] = i[n]), (t[n] = r));
                  else t[o] = r;
              })(l, u.opts.specialEasing);
              i < s;
              i++
            )
              if ((o = wt.prefilters[i].call(u, e, l, u.opts)))
                return (
                  v(o.stop) &&
                    ($._queueHooks(u.elem, u.opts.queue).stop = o.stop.bind(o)),
                  o
                );
            return (
              $.map(l, bt, u),
              v(u.opts.start) && u.opts.start.call(e, u),
              u
                .progress(u.opts.progress)
                .done(u.opts.done, u.opts.complete)
                .fail(u.opts.fail)
                .always(u.opts.always),
              $.fx.timer(
                $.extend(c, { elem: e, anim: u, queue: u.opts.queue })
              ),
              u
            );
          }
          ($.Animation = $.extend(wt, {
            tweeners: {
              "*": [
                function (e, t) {
                  var n = this.createTween(e, t);
                  return be(n.elem, e, pe.exec(t), n), n;
                },
              ],
            },
            tweener: function (e, t) {
              v(e) ? ((t = e), (e = ["*"])) : (e = e.match(z));
              for (var n, o = 0, r = e.length; o < r; o++)
                (n = e[o]),
                  (wt.tweeners[n] = wt.tweeners[n] || []),
                  wt.tweeners[n].unshift(t);
            },
            prefilters: [
              function (e, t, n) {
                var o,
                  r,
                  i,
                  s,
                  a,
                  c,
                  u,
                  l,
                  d = "width" in t || "height" in t,
                  f = this,
                  p = {},
                  h = e.style,
                  g = e.nodeType && ye(e),
                  m = ae.get(e, "fxshow");
                for (o in (n.queue ||
                  (null == (s = $._queueHooks(e, "fx")).unqueued &&
                    ((s.unqueued = 0),
                    (a = s.empty.fire),
                    (s.empty.fire = function () {
                      s.unqueued || a();
                    })),
                  s.unqueued++,
                  f.always(function () {
                    f.always(function () {
                      s.unqueued--, $.queue(e, "fx").length || s.empty.fire();
                    });
                  })),
                t))
                  if (((r = t[o]), ht.test(r))) {
                    if (
                      (delete t[o],
                      (i = i || "toggle" === r),
                      r === (g ? "hide" : "show"))
                    ) {
                      if ("show" !== r || !m || void 0 === m[o]) continue;
                      g = !0;
                    }
                    p[o] = (m && m[o]) || $.style(e, o);
                  }
                if ((c = !$.isEmptyObject(t)) || !$.isEmptyObject(p))
                  for (o in (d &&
                    1 === e.nodeType &&
                    ((n.overflow = [h.overflow, h.overflowX, h.overflowY]),
                    null == (u = m && m.display) && (u = ae.get(e, "display")),
                    "none" === (l = $.css(e, "display")) &&
                      (u
                        ? (l = u)
                        : (_e([e], !0),
                          (u = e.style.display || u),
                          (l = $.css(e, "display")),
                          _e([e]))),
                    ("inline" === l || ("inline-block" === l && null != u)) &&
                      "none" === $.css(e, "float") &&
                      (c ||
                        (f.done(function () {
                          h.display = u;
                        }),
                        null == u &&
                          ((l = h.display), (u = "none" === l ? "" : l))),
                      (h.display = "inline-block"))),
                  n.overflow &&
                    ((h.overflow = "hidden"),
                    f.always(function () {
                      (h.overflow = n.overflow[0]),
                        (h.overflowX = n.overflow[1]),
                        (h.overflowY = n.overflow[2]);
                    })),
                  (c = !1),
                  p))
                    c ||
                      (m
                        ? "hidden" in m && (g = m.hidden)
                        : (m = ae.access(e, "fxshow", { display: u })),
                      i && (m.hidden = !g),
                      g && _e([e], !0),
                      f.done(function () {
                        for (o in (g || _e([e]), ae.remove(e, "fxshow"), p))
                          $.style(e, o, p[o]);
                      })),
                      (c = bt(g ? m[o] : 0, o, f)),
                      o in m ||
                        ((m[o] = c.start),
                        g && ((c.end = c.start), (c.start = 0)));
              },
            ],
            prefilter: function (e, t) {
              t ? wt.prefilters.unshift(e) : wt.prefilters.push(e);
            },
          })),
            ($.speed = function (e, t, n) {
              var o =
                e && "object" == typeof e
                  ? $.extend({}, e)
                  : {
                      complete: n || (!n && t) || (v(e) && e),
                      duration: e,
                      easing: (n && t) || (t && !v(t) && t),
                    };
              return (
                $.fx.off
                  ? (o.duration = 0)
                  : "number" != typeof o.duration &&
                    (o.duration in $.fx.speeds
                      ? (o.duration = $.fx.speeds[o.duration])
                      : (o.duration = $.fx.speeds._default)),
                (null != o.queue && !0 !== o.queue) || (o.queue = "fx"),
                (o.old = o.complete),
                (o.complete = function () {
                  v(o.old) && o.old.call(this),
                    o.queue && $.dequeue(this, o.queue);
                }),
                o
              );
            }),
            $.fn.extend({
              fadeTo: function (e, t, n, o) {
                return this.filter(ye)
                  .css("opacity", 0)
                  .show()
                  .end()
                  .animate({ opacity: t }, e, n, o);
              },
              animate: function (e, t, n, o) {
                var r = $.isEmptyObject(e),
                  i = $.speed(t, n, o),
                  s = function () {
                    var t = wt(this, $.extend({}, e), i);
                    (r || ae.get(this, "finish")) && t.stop(!0);
                  };
                return (
                  (s.finish = s),
                  r || !1 === i.queue ? this.each(s) : this.queue(i.queue, s)
                );
              },
              stop: function (e, t, n) {
                var o = function (e) {
                  var t = e.stop;
                  delete e.stop, t(n);
                };
                return (
                  "string" != typeof e && ((n = t), (t = e), (e = void 0)),
                  t && this.queue(e || "fx", []),
                  this.each(function () {
                    var t = !0,
                      r = null != e && e + "queueHooks",
                      i = $.timers,
                      s = ae.get(this);
                    if (r) s[r] && s[r].stop && o(s[r]);
                    else
                      for (r in s) s[r] && s[r].stop && gt.test(r) && o(s[r]);
                    for (r = i.length; r--; )
                      i[r].elem !== this ||
                        (null != e && i[r].queue !== e) ||
                        (i[r].anim.stop(n), (t = !1), i.splice(r, 1));
                    (!t && n) || $.dequeue(this, e);
                  })
                );
              },
              finish: function (e) {
                return (
                  !1 !== e && (e = e || "fx"),
                  this.each(function () {
                    var t,
                      n = ae.get(this),
                      o = n[e + "queue"],
                      r = n[e + "queueHooks"],
                      i = $.timers,
                      s = o ? o.length : 0;
                    for (
                      n.finish = !0,
                        $.queue(this, e, []),
                        r && r.stop && r.stop.call(this, !0),
                        t = i.length;
                      t--;

                    )
                      i[t].elem === this &&
                        i[t].queue === e &&
                        (i[t].anim.stop(!0), i.splice(t, 1));
                    for (t = 0; t < s; t++)
                      o[t] && o[t].finish && o[t].finish.call(this);
                    delete n.finish;
                  })
                );
              },
            }),
            $.each(["toggle", "show", "hide"], function (e, t) {
              var n = $.fn[t];
              $.fn[t] = function (e, o, r) {
                return null == e || "boolean" == typeof e
                  ? n.apply(this, arguments)
                  : this.animate(yt(t, !0), e, o, r);
              };
            }),
            $.each(
              {
                slideDown: yt("show"),
                slideUp: yt("hide"),
                slideToggle: yt("toggle"),
                fadeIn: { opacity: "show" },
                fadeOut: { opacity: "hide" },
                fadeToggle: { opacity: "toggle" },
              },
              function (e, t) {
                $.fn[e] = function (e, n, o) {
                  return this.animate(t, e, n, o);
                };
              }
            ),
            ($.timers = []),
            ($.fx.tick = function () {
              var e,
                t = 0,
                n = $.timers;
              for (ft = Date.now(); t < n.length; t++)
                (e = n[t])() || n[t] !== e || n.splice(t--, 1);
              n.length || $.fx.stop(), (ft = void 0);
            }),
            ($.fx.timer = function (e) {
              $.timers.push(e), $.fx.start();
            }),
            ($.fx.interval = 13),
            ($.fx.start = function () {
              pt || ((pt = !0), mt());
            }),
            ($.fx.stop = function () {
              pt = null;
            }),
            ($.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
            ($.fn.delay = function (e, t) {
              return (
                (e = ($.fx && $.fx.speeds[e]) || e),
                (t = t || "fx"),
                this.queue(t, function (t, n) {
                  var r = o.setTimeout(t, e);
                  n.stop = function () {
                    o.clearTimeout(r);
                  };
                })
              );
            }),
            (function () {
              var e = b.createElement("input"),
                t = b
                  .createElement("select")
                  .appendChild(b.createElement("option"));
              (e.type = "checkbox"),
                (m.checkOn = "" !== e.value),
                (m.optSelected = t.selected),
                ((e = b.createElement("input")).value = "t"),
                (e.type = "radio"),
                (m.radioValue = "t" === e.value);
            })();
          var xt,
            _t = $.expr.attrHandle;
          $.fn.extend({
            attr: function (e, t) {
              return ee(this, $.attr, e, t, arguments.length > 1);
            },
            removeAttr: function (e) {
              return this.each(function () {
                $.removeAttr(this, e);
              });
            },
          }),
            $.extend({
              attr: function (e, t, n) {
                var o,
                  r,
                  i = e.nodeType;
                if (3 !== i && 8 !== i && 2 !== i)
                  return void 0 === e.getAttribute
                    ? $.prop(e, t, n)
                    : ((1 === i && $.isXMLDoc(e)) ||
                        (r =
                          $.attrHooks[t.toLowerCase()] ||
                          ($.expr.match.bool.test(t) ? xt : void 0)),
                      void 0 !== n
                        ? null === n
                          ? void $.removeAttr(e, t)
                          : r && "set" in r && void 0 !== (o = r.set(e, n, t))
                          ? o
                          : (e.setAttribute(t, n + ""), n)
                        : r && "get" in r && null !== (o = r.get(e, t))
                        ? o
                        : null == (o = $.find.attr(e, t))
                        ? void 0
                        : o);
              },
              attrHooks: {
                type: {
                  set: function (e, t) {
                    if (!m.radioValue && "radio" === t && T(e, "input")) {
                      var n = e.value;
                      return e.setAttribute("type", t), n && (e.value = n), t;
                    }
                  },
                },
              },
              removeAttr: function (e, t) {
                var n,
                  o = 0,
                  r = t && t.match(z);
                if (r && 1 === e.nodeType)
                  for (; (n = r[o++]); ) e.removeAttribute(n);
              },
            }),
            (xt = {
              set: function (e, t, n) {
                return !1 === t ? $.removeAttr(e, n) : e.setAttribute(n, n), n;
              },
            }),
            $.each($.expr.match.bool.source.match(/\w+/g), function (e, t) {
              var n = _t[t] || $.find.attr;
              _t[t] = function (e, t, o) {
                var r,
                  i,
                  s = t.toLowerCase();
                return (
                  o ||
                    ((i = _t[s]),
                    (_t[s] = r),
                    (r = null != n(e, t, o) ? s : null),
                    (_t[s] = i)),
                  r
                );
              };
            });
          var kt = /^(?:input|select|textarea|button)$/i,
            St = /^(?:a|area)$/i;
          function $t(e) {
            return (e.match(z) || []).join(" ");
          }
          function Et(e) {
            return (e.getAttribute && e.getAttribute("class")) || "";
          }
          function Tt(e) {
            return Array.isArray(e)
              ? e
              : ("string" == typeof e && e.match(z)) || [];
          }
          $.fn.extend({
            prop: function (e, t) {
              return ee(this, $.prop, e, t, arguments.length > 1);
            },
            removeProp: function (e) {
              return this.each(function () {
                delete this[$.propFix[e] || e];
              });
            },
          }),
            $.extend({
              prop: function (e, t, n) {
                var o,
                  r,
                  i = e.nodeType;
                if (3 !== i && 8 !== i && 2 !== i)
                  return (
                    (1 === i && $.isXMLDoc(e)) ||
                      ((t = $.propFix[t] || t), (r = $.propHooks[t])),
                    void 0 !== n
                      ? r && "set" in r && void 0 !== (o = r.set(e, n, t))
                        ? o
                        : (e[t] = n)
                      : r && "get" in r && null !== (o = r.get(e, t))
                      ? o
                      : e[t]
                  );
              },
              propHooks: {
                tabIndex: {
                  get: function (e) {
                    var t = $.find.attr(e, "tabindex");
                    return t
                      ? parseInt(t, 10)
                      : kt.test(e.nodeName) || (St.test(e.nodeName) && e.href)
                      ? 0
                      : -1;
                  },
                },
              },
              propFix: { for: "htmlFor", class: "className" },
            }),
            m.optSelected ||
              ($.propHooks.selected = {
                get: function (e) {
                  var t = e.parentNode;
                  return t && t.parentNode && t.parentNode.selectedIndex, null;
                },
                set: function (e) {
                  var t = e.parentNode;
                  t &&
                    (t.selectedIndex,
                    t.parentNode && t.parentNode.selectedIndex);
                },
              }),
            $.each(
              [
                "tabIndex",
                "readOnly",
                "maxLength",
                "cellSpacing",
                "cellPadding",
                "rowSpan",
                "colSpan",
                "useMap",
                "frameBorder",
                "contentEditable",
              ],
              function () {
                $.propFix[this.toLowerCase()] = this;
              }
            ),
            $.fn.extend({
              addClass: function (e) {
                var t, n, o, r, i, s;
                return v(e)
                  ? this.each(function (t) {
                      $(this).addClass(e.call(this, t, Et(this)));
                    })
                  : (t = Tt(e)).length
                  ? this.each(function () {
                      if (
                        ((o = Et(this)),
                        (n = 1 === this.nodeType && " " + $t(o) + " "))
                      ) {
                        for (i = 0; i < t.length; i++)
                          (r = t[i]),
                            n.indexOf(" " + r + " ") < 0 && (n += r + " ");
                        (s = $t(n)), o !== s && this.setAttribute("class", s);
                      }
                    })
                  : this;
              },
              removeClass: function (e) {
                var t, n, o, r, i, s;
                return v(e)
                  ? this.each(function (t) {
                      $(this).removeClass(e.call(this, t, Et(this)));
                    })
                  : arguments.length
                  ? (t = Tt(e)).length
                    ? this.each(function () {
                        if (
                          ((o = Et(this)),
                          (n = 1 === this.nodeType && " " + $t(o) + " "))
                        ) {
                          for (i = 0; i < t.length; i++)
                            for (r = t[i]; n.indexOf(" " + r + " ") > -1; )
                              n = n.replace(" " + r + " ", " ");
                          (s = $t(n)), o !== s && this.setAttribute("class", s);
                        }
                      })
                    : this
                  : this.attr("class", "");
              },
              toggleClass: function (e, t) {
                var n,
                  o,
                  r,
                  i,
                  s = typeof e,
                  a = "string" === s || Array.isArray(e);
                return v(e)
                  ? this.each(function (n) {
                      $(this).toggleClass(e.call(this, n, Et(this), t), t);
                    })
                  : "boolean" == typeof t && a
                  ? t
                    ? this.addClass(e)
                    : this.removeClass(e)
                  : ((n = Tt(e)),
                    this.each(function () {
                      if (a)
                        for (i = $(this), r = 0; r < n.length; r++)
                          (o = n[r]),
                            i.hasClass(o) ? i.removeClass(o) : i.addClass(o);
                      else
                        (void 0 !== e && "boolean" !== s) ||
                          ((o = Et(this)) && ae.set(this, "__className__", o),
                          this.setAttribute &&
                            this.setAttribute(
                              "class",
                              o || !1 === e
                                ? ""
                                : ae.get(this, "__className__") || ""
                            ));
                    }));
              },
              hasClass: function (e) {
                var t,
                  n,
                  o = 0;
                for (t = " " + e + " "; (n = this[o++]); )
                  if (
                    1 === n.nodeType &&
                    (" " + $t(Et(n)) + " ").indexOf(t) > -1
                  )
                    return !0;
                return !1;
              },
            });
          var Ct = /\r/g;
          $.fn.extend({
            val: function (e) {
              var t,
                n,
                o,
                r = this[0];
              return arguments.length
                ? ((o = v(e)),
                  this.each(function (n) {
                    var r;
                    1 === this.nodeType &&
                      (null == (r = o ? e.call(this, n, $(this).val()) : e)
                        ? (r = "")
                        : "number" == typeof r
                        ? (r += "")
                        : Array.isArray(r) &&
                          (r = $.map(r, function (e) {
                            return null == e ? "" : e + "";
                          })),
                      ((t =
                        $.valHooks[this.type] ||
                        $.valHooks[this.nodeName.toLowerCase()]) &&
                        "set" in t &&
                        void 0 !== t.set(this, r, "value")) ||
                        (this.value = r));
                  }))
                : r
                ? (t =
                    $.valHooks[r.type] ||
                    $.valHooks[r.nodeName.toLowerCase()]) &&
                  "get" in t &&
                  void 0 !== (n = t.get(r, "value"))
                  ? n
                  : "string" == typeof (n = r.value)
                  ? n.replace(Ct, "")
                  : null == n
                  ? ""
                  : n
                : void 0;
            },
          }),
            $.extend({
              valHooks: {
                option: {
                  get: function (e) {
                    var t = $.find.attr(e, "value");
                    return null != t ? t : $t($.text(e));
                  },
                },
                select: {
                  get: function (e) {
                    var t,
                      n,
                      o,
                      r = e.options,
                      i = e.selectedIndex,
                      s = "select-one" === e.type,
                      a = s ? null : [],
                      c = s ? i + 1 : r.length;
                    for (o = i < 0 ? c : s ? i : 0; o < c; o++)
                      if (
                        ((n = r[o]).selected || o === i) &&
                        !n.disabled &&
                        (!n.parentNode.disabled || !T(n.parentNode, "optgroup"))
                      ) {
                        if (((t = $(n).val()), s)) return t;
                        a.push(t);
                      }
                    return a;
                  },
                  set: function (e, t) {
                    for (
                      var n, o, r = e.options, i = $.makeArray(t), s = r.length;
                      s--;

                    )
                      ((o = r[s]).selected =
                        $.inArray($.valHooks.option.get(o), i) > -1) &&
                        (n = !0);
                    return n || (e.selectedIndex = -1), i;
                  },
                },
              },
            }),
            $.each(["radio", "checkbox"], function () {
              ($.valHooks[this] = {
                set: function (e, t) {
                  if (Array.isArray(t))
                    return (e.checked = $.inArray($(e).val(), t) > -1);
                },
              }),
                m.checkOn ||
                  ($.valHooks[this].get = function (e) {
                    return null === e.getAttribute("value") ? "on" : e.value;
                  });
            });
          var jt = o.location,
            qt = { guid: Date.now() },
            At = /\?/;
          $.parseXML = function (e) {
            var t, n;
            if (!e || "string" != typeof e) return null;
            try {
              t = new o.DOMParser().parseFromString(e, "text/xml");
            } catch (e) {}
            return (
              (n = t && t.getElementsByTagName("parsererror")[0]),
              (t && !n) ||
                $.error(
                  "Invalid XML: " +
                    (n
                      ? $.map(n.childNodes, function (e) {
                          return e.textContent;
                        }).join("\n")
                      : e)
                ),
              t
            );
          };
          var Pt = /^(?:focusinfocus|focusoutblur)$/,
            It = function (e) {
              e.stopPropagation();
            };
          $.extend($.event, {
            trigger: function (e, t, n, r) {
              var i,
                s,
                a,
                c,
                u,
                l,
                d,
                f,
                h = [n || b],
                g = p.call(e, "type") ? e.type : e,
                m = p.call(e, "namespace") ? e.namespace.split(".") : [];
              if (
                ((s = f = a = n = n || b),
                3 !== n.nodeType &&
                  8 !== n.nodeType &&
                  !Pt.test(g + $.event.triggered) &&
                  (g.indexOf(".") > -1 &&
                    ((m = g.split(".")), (g = m.shift()), m.sort()),
                  (u = g.indexOf(":") < 0 && "on" + g),
                  ((e = e[$.expando]
                    ? e
                    : new $.Event(g, "object" == typeof e && e)).isTrigger = r
                    ? 2
                    : 3),
                  (e.namespace = m.join(".")),
                  (e.rnamespace = e.namespace
                    ? new RegExp(
                        "(^|\\.)" + m.join("\\.(?:.*\\.|)") + "(\\.|$)"
                      )
                    : null),
                  (e.result = void 0),
                  e.target || (e.target = n),
                  (t = null == t ? [e] : $.makeArray(t, [e])),
                  (d = $.event.special[g] || {}),
                  r || !d.trigger || !1 !== d.trigger.apply(n, t)))
              ) {
                if (!r && !d.noBubble && !y(n)) {
                  for (
                    c = d.delegateType || g,
                      Pt.test(c + g) || (s = s.parentNode);
                    s;
                    s = s.parentNode
                  )
                    h.push(s), (a = s);
                  a === (n.ownerDocument || b) &&
                    h.push(a.defaultView || a.parentWindow || o);
                }
                for (i = 0; (s = h[i++]) && !e.isPropagationStopped(); )
                  (f = s),
                    (e.type = i > 1 ? c : d.bindType || g),
                    (l =
                      (ae.get(s, "events") || Object.create(null))[e.type] &&
                      ae.get(s, "handle")) && l.apply(s, t),
                    (l = u && s[u]) &&
                      l.apply &&
                      ie(s) &&
                      ((e.result = l.apply(s, t)),
                      !1 === e.result && e.preventDefault());
                return (
                  (e.type = g),
                  r ||
                    e.isDefaultPrevented() ||
                    (d._default && !1 !== d._default.apply(h.pop(), t)) ||
                    !ie(n) ||
                    (u &&
                      v(n[g]) &&
                      !y(n) &&
                      ((a = n[u]) && (n[u] = null),
                      ($.event.triggered = g),
                      e.isPropagationStopped() && f.addEventListener(g, It),
                      n[g](),
                      e.isPropagationStopped() && f.removeEventListener(g, It),
                      ($.event.triggered = void 0),
                      a && (n[u] = a))),
                  e.result
                );
              }
            },
            simulate: function (e, t, n) {
              var o = $.extend(new $.Event(), n, { type: e, isSimulated: !0 });
              $.event.trigger(o, null, t);
            },
          }),
            $.fn.extend({
              trigger: function (e, t) {
                return this.each(function () {
                  $.event.trigger(e, t, this);
                });
              },
              triggerHandler: function (e, t) {
                var n = this[0];
                if (n) return $.event.trigger(e, t, n, !0);
              },
            });
          var Nt = /\[\]$/,
            Ot = /\r?\n/g,
            Lt = /^(?:submit|button|image|reset|file)$/i,
            Mt = /^(?:input|select|textarea|keygen)/i;
          function Rt(e, t, n, o) {
            var r;
            if (Array.isArray(t))
              $.each(t, function (t, r) {
                n || Nt.test(e)
                  ? o(e, r)
                  : Rt(
                      e +
                        "[" +
                        ("object" == typeof r && null != r ? t : "") +
                        "]",
                      r,
                      n,
                      o
                    );
              });
            else if (n || "object" !== _(t)) o(e, t);
            else for (r in t) Rt(e + "[" + r + "]", t[r], n, o);
          }
          ($.param = function (e, t) {
            var n,
              o = [],
              r = function (e, t) {
                var n = v(t) ? t() : t;
                o[o.length] =
                  encodeURIComponent(e) +
                  "=" +
                  encodeURIComponent(null == n ? "" : n);
              };
            if (null == e) return "";
            if (Array.isArray(e) || (e.jquery && !$.isPlainObject(e)))
              $.each(e, function () {
                r(this.name, this.value);
              });
            else for (n in e) Rt(n, e[n], t, r);
            return o.join("&");
          }),
            $.fn.extend({
              serialize: function () {
                return $.param(this.serializeArray());
              },
              serializeArray: function () {
                return this.map(function () {
                  var e = $.prop(this, "elements");
                  return e ? $.makeArray(e) : this;
                })
                  .filter(function () {
                    var e = this.type;
                    return (
                      this.name &&
                      !$(this).is(":disabled") &&
                      Mt.test(this.nodeName) &&
                      !Lt.test(e) &&
                      (this.checked || !$e.test(e))
                    );
                  })
                  .map(function (e, t) {
                    var n = $(this).val();
                    return null == n
                      ? null
                      : Array.isArray(n)
                      ? $.map(n, function (e) {
                          return { name: t.name, value: e.replace(Ot, "\r\n") };
                        })
                      : { name: t.name, value: n.replace(Ot, "\r\n") };
                  })
                  .get();
              },
            });
          var Dt = /%20/g,
            Ht = /#.*$/,
            Ft = /([?&])_=[^&]*/,
            Qt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
            Bt = /^(?:GET|HEAD)$/,
            Wt = /^\/\//,
            Vt = {},
            Ut = {},
            zt = "*/".concat("*"),
            Jt = b.createElement("a");
          function Xt(e) {
            return function (t, n) {
              "string" != typeof t && ((n = t), (t = "*"));
              var o,
                r = 0,
                i = t.toLowerCase().match(z) || [];
              if (v(n))
                for (; (o = i[r++]); )
                  "+" === o[0]
                    ? ((o = o.slice(1) || "*"), (e[o] = e[o] || []).unshift(n))
                    : (e[o] = e[o] || []).push(n);
            };
          }
          function Gt(e, t, n, o) {
            var r = {},
              i = e === Ut;
            function s(a) {
              var c;
              return (
                (r[a] = !0),
                $.each(e[a] || [], function (e, a) {
                  var u = a(t, n, o);
                  return "string" != typeof u || i || r[u]
                    ? i
                      ? !(c = u)
                      : void 0
                    : (t.dataTypes.unshift(u), s(u), !1);
                }),
                c
              );
            }
            return s(t.dataTypes[0]) || (!r["*"] && s("*"));
          }
          function Yt(e, t) {
            var n,
              o,
              r = $.ajaxSettings.flatOptions || {};
            for (n in t)
              void 0 !== t[n] && ((r[n] ? e : o || (o = {}))[n] = t[n]);
            return o && $.extend(!0, e, o), e;
          }
          (Jt.href = jt.href),
            $.extend({
              active: 0,
              lastModified: {},
              etag: {},
              ajaxSettings: {
                url: jt.href,
                type: "GET",
                isLocal:
                  /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(
                    jt.protocol
                  ),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                  "*": zt,
                  text: "text/plain",
                  html: "text/html",
                  xml: "application/xml, text/xml",
                  json: "application/json, text/javascript",
                },
                contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ },
                responseFields: {
                  xml: "responseXML",
                  text: "responseText",
                  json: "responseJSON",
                },
                converters: {
                  "* text": String,
                  "text html": !0,
                  "text json": JSON.parse,
                  "text xml": $.parseXML,
                },
                flatOptions: { url: !0, context: !0 },
              },
              ajaxSetup: function (e, t) {
                return t ? Yt(Yt(e, $.ajaxSettings), t) : Yt($.ajaxSettings, e);
              },
              ajaxPrefilter: Xt(Vt),
              ajaxTransport: Xt(Ut),
              ajax: function (e, t) {
                "object" == typeof e && ((t = e), (e = void 0)), (t = t || {});
                var n,
                  r,
                  i,
                  s,
                  a,
                  c,
                  u,
                  l,
                  d,
                  f,
                  p = $.ajaxSetup({}, t),
                  h = p.context || p,
                  g = p.context && (h.nodeType || h.jquery) ? $(h) : $.event,
                  m = $.Deferred(),
                  v = $.Callbacks("once memory"),
                  y = p.statusCode || {},
                  w = {},
                  x = {},
                  _ = "canceled",
                  k = {
                    readyState: 0,
                    getResponseHeader: function (e) {
                      var t;
                      if (u) {
                        if (!s)
                          for (s = {}; (t = Qt.exec(i)); )
                            s[t[1].toLowerCase() + " "] = (
                              s[t[1].toLowerCase() + " "] || []
                            ).concat(t[2]);
                        t = s[e.toLowerCase() + " "];
                      }
                      return null == t ? null : t.join(", ");
                    },
                    getAllResponseHeaders: function () {
                      return u ? i : null;
                    },
                    setRequestHeader: function (e, t) {
                      return (
                        null == u &&
                          ((e = x[e.toLowerCase()] = x[e.toLowerCase()] || e),
                          (w[e] = t)),
                        this
                      );
                    },
                    overrideMimeType: function (e) {
                      return null == u && (p.mimeType = e), this;
                    },
                    statusCode: function (e) {
                      var t;
                      if (e)
                        if (u) k.always(e[k.status]);
                        else for (t in e) y[t] = [y[t], e[t]];
                      return this;
                    },
                    abort: function (e) {
                      var t = e || _;
                      return n && n.abort(t), S(0, t), this;
                    },
                  };
                if (
                  (m.promise(k),
                  (p.url = ((e || p.url || jt.href) + "").replace(
                    Wt,
                    jt.protocol + "//"
                  )),
                  (p.type = t.method || t.type || p.method || p.type),
                  (p.dataTypes = (p.dataType || "*").toLowerCase().match(z) || [
                    "",
                  ]),
                  null == p.crossDomain)
                ) {
                  c = b.createElement("a");
                  try {
                    (c.href = p.url),
                      (c.href = c.href),
                      (p.crossDomain =
                        Jt.protocol + "//" + Jt.host !=
                        c.protocol + "//" + c.host);
                  } catch (e) {
                    p.crossDomain = !0;
                  }
                }
                if (
                  (p.data &&
                    p.processData &&
                    "string" != typeof p.data &&
                    (p.data = $.param(p.data, p.traditional)),
                  Gt(Vt, p, t, k),
                  u)
                )
                  return k;
                for (d in ((l = $.event && p.global) &&
                  0 == $.active++ &&
                  $.event.trigger("ajaxStart"),
                (p.type = p.type.toUpperCase()),
                (p.hasContent = !Bt.test(p.type)),
                (r = p.url.replace(Ht, "")),
                p.hasContent
                  ? p.data &&
                    p.processData &&
                    0 ===
                      (p.contentType || "").indexOf(
                        "application/x-www-form-urlencoded"
                      ) &&
                    (p.data = p.data.replace(Dt, "+"))
                  : ((f = p.url.slice(r.length)),
                    p.data &&
                      (p.processData || "string" == typeof p.data) &&
                      ((r += (At.test(r) ? "&" : "?") + p.data), delete p.data),
                    !1 === p.cache &&
                      ((r = r.replace(Ft, "$1")),
                      (f = (At.test(r) ? "&" : "?") + "_=" + qt.guid++ + f)),
                    (p.url = r + f)),
                p.ifModified &&
                  ($.lastModified[r] &&
                    k.setRequestHeader("If-Modified-Since", $.lastModified[r]),
                  $.etag[r] && k.setRequestHeader("If-None-Match", $.etag[r])),
                ((p.data && p.hasContent && !1 !== p.contentType) ||
                  t.contentType) &&
                  k.setRequestHeader("Content-Type", p.contentType),
                k.setRequestHeader(
                  "Accept",
                  p.dataTypes[0] && p.accepts[p.dataTypes[0]]
                    ? p.accepts[p.dataTypes[0]] +
                        ("*" !== p.dataTypes[0] ? ", " + zt + "; q=0.01" : "")
                    : p.accepts["*"]
                ),
                p.headers))
                  k.setRequestHeader(d, p.headers[d]);
                if (p.beforeSend && (!1 === p.beforeSend.call(h, k, p) || u))
                  return k.abort();
                if (
                  ((_ = "abort"),
                  v.add(p.complete),
                  k.done(p.success),
                  k.fail(p.error),
                  (n = Gt(Ut, p, t, k)))
                ) {
                  if (
                    ((k.readyState = 1), l && g.trigger("ajaxSend", [k, p]), u)
                  )
                    return k;
                  p.async &&
                    p.timeout > 0 &&
                    (a = o.setTimeout(function () {
                      k.abort("timeout");
                    }, p.timeout));
                  try {
                    (u = !1), n.send(w, S);
                  } catch (e) {
                    if (u) throw e;
                    S(-1, e);
                  }
                } else S(-1, "No Transport");
                function S(e, t, s, c) {
                  var d,
                    f,
                    b,
                    w,
                    x,
                    _ = t;
                  u ||
                    ((u = !0),
                    a && o.clearTimeout(a),
                    (n = void 0),
                    (i = c || ""),
                    (k.readyState = e > 0 ? 4 : 0),
                    (d = (e >= 200 && e < 300) || 304 === e),
                    s &&
                      (w = (function (e, t, n) {
                        for (
                          var o, r, i, s, a = e.contents, c = e.dataTypes;
                          "*" === c[0];

                        )
                          c.shift(),
                            void 0 === o &&
                              (o =
                                e.mimeType ||
                                t.getResponseHeader("Content-Type"));
                        if (o)
                          for (r in a)
                            if (a[r] && a[r].test(o)) {
                              c.unshift(r);
                              break;
                            }
                        if (c[0] in n) i = c[0];
                        else {
                          for (r in n) {
                            if (!c[0] || e.converters[r + " " + c[0]]) {
                              i = r;
                              break;
                            }
                            s || (s = r);
                          }
                          i = i || s;
                        }
                        if (i) return i !== c[0] && c.unshift(i), n[i];
                      })(p, k, s)),
                    !d &&
                      $.inArray("script", p.dataTypes) > -1 &&
                      $.inArray("json", p.dataTypes) < 0 &&
                      (p.converters["text script"] = function () {}),
                    (w = (function (e, t, n, o) {
                      var r,
                        i,
                        s,
                        a,
                        c,
                        u = {},
                        l = e.dataTypes.slice();
                      if (l[1])
                        for (s in e.converters)
                          u[s.toLowerCase()] = e.converters[s];
                      for (i = l.shift(); i; )
                        if (
                          (e.responseFields[i] && (n[e.responseFields[i]] = t),
                          !c &&
                            o &&
                            e.dataFilter &&
                            (t = e.dataFilter(t, e.dataType)),
                          (c = i),
                          (i = l.shift()))
                        )
                          if ("*" === i) i = c;
                          else if ("*" !== c && c !== i) {
                            if (!(s = u[c + " " + i] || u["* " + i]))
                              for (r in u)
                                if (
                                  (a = r.split(" "))[1] === i &&
                                  (s = u[c + " " + a[0]] || u["* " + a[0]])
                                ) {
                                  !0 === s
                                    ? (s = u[r])
                                    : !0 !== u[r] &&
                                      ((i = a[0]), l.unshift(a[1]));
                                  break;
                                }
                            if (!0 !== s)
                              if (s && e.throws) t = s(t);
                              else
                                try {
                                  t = s(t);
                                } catch (e) {
                                  return {
                                    state: "parsererror",
                                    error: s
                                      ? e
                                      : "No conversion from " + c + " to " + i,
                                  };
                                }
                          }
                      return { state: "success", data: t };
                    })(p, w, k, d)),
                    d
                      ? (p.ifModified &&
                          ((x = k.getResponseHeader("Last-Modified")) &&
                            ($.lastModified[r] = x),
                          (x = k.getResponseHeader("etag")) && ($.etag[r] = x)),
                        204 === e || "HEAD" === p.type
                          ? (_ = "nocontent")
                          : 304 === e
                          ? (_ = "notmodified")
                          : ((_ = w.state), (f = w.data), (d = !(b = w.error))))
                      : ((b = _),
                        (!e && _) || ((_ = "error"), e < 0 && (e = 0))),
                    (k.status = e),
                    (k.statusText = (t || _) + ""),
                    d
                      ? m.resolveWith(h, [f, _, k])
                      : m.rejectWith(h, [k, _, b]),
                    k.statusCode(y),
                    (y = void 0),
                    l &&
                      g.trigger(d ? "ajaxSuccess" : "ajaxError", [
                        k,
                        p,
                        d ? f : b,
                      ]),
                    v.fireWith(h, [k, _]),
                    l &&
                      (g.trigger("ajaxComplete", [k, p]),
                      --$.active || $.event.trigger("ajaxStop")));
                }
                return k;
              },
              getJSON: function (e, t, n) {
                return $.get(e, t, n, "json");
              },
              getScript: function (e, t) {
                return $.get(e, void 0, t, "script");
              },
            }),
            $.each(["get", "post"], function (e, t) {
              $[t] = function (e, n, o, r) {
                return (
                  v(n) && ((r = r || o), (o = n), (n = void 0)),
                  $.ajax(
                    $.extend(
                      { url: e, type: t, dataType: r, data: n, success: o },
                      $.isPlainObject(e) && e
                    )
                  )
                );
              };
            }),
            $.ajaxPrefilter(function (e) {
              var t;
              for (t in e.headers)
                "content-type" === t.toLowerCase() &&
                  (e.contentType = e.headers[t] || "");
            }),
            ($._evalUrl = function (e, t, n) {
              return $.ajax({
                url: e,
                type: "GET",
                dataType: "script",
                cache: !0,
                async: !1,
                global: !1,
                converters: { "text script": function () {} },
                dataFilter: function (e) {
                  $.globalEval(e, t, n);
                },
              });
            }),
            $.fn.extend({
              wrapAll: function (e) {
                var t;
                return (
                  this[0] &&
                    (v(e) && (e = e.call(this[0])),
                    (t = $(e, this[0].ownerDocument).eq(0).clone(!0)),
                    this[0].parentNode && t.insertBefore(this[0]),
                    t
                      .map(function () {
                        for (var e = this; e.firstElementChild; )
                          e = e.firstElementChild;
                        return e;
                      })
                      .append(this)),
                  this
                );
              },
              wrapInner: function (e) {
                return v(e)
                  ? this.each(function (t) {
                      $(this).wrapInner(e.call(this, t));
                    })
                  : this.each(function () {
                      var t = $(this),
                        n = t.contents();
                      n.length ? n.wrapAll(e) : t.append(e);
                    });
              },
              wrap: function (e) {
                var t = v(e);
                return this.each(function (n) {
                  $(this).wrapAll(t ? e.call(this, n) : e);
                });
              },
              unwrap: function (e) {
                return (
                  this.parent(e)
                    .not("body")
                    .each(function () {
                      $(this).replaceWith(this.childNodes);
                    }),
                  this
                );
              },
            }),
            ($.expr.pseudos.hidden = function (e) {
              return !$.expr.pseudos.visible(e);
            }),
            ($.expr.pseudos.visible = function (e) {
              return !!(
                e.offsetWidth ||
                e.offsetHeight ||
                e.getClientRects().length
              );
            }),
            ($.ajaxSettings.xhr = function () {
              try {
                return new o.XMLHttpRequest();
              } catch (e) {}
            });
          var Kt = { 0: 200, 1223: 204 },
            Zt = $.ajaxSettings.xhr();
          (m.cors = !!Zt && "withCredentials" in Zt),
            (m.ajax = Zt = !!Zt),
            $.ajaxTransport(function (e) {
              var t, n;
              if (m.cors || (Zt && !e.crossDomain))
                return {
                  send: function (r, i) {
                    var s,
                      a = e.xhr();
                    if (
                      (a.open(e.type, e.url, e.async, e.username, e.password),
                      e.xhrFields)
                    )
                      for (s in e.xhrFields) a[s] = e.xhrFields[s];
                    for (s in (e.mimeType &&
                      a.overrideMimeType &&
                      a.overrideMimeType(e.mimeType),
                    e.crossDomain ||
                      r["X-Requested-With"] ||
                      (r["X-Requested-With"] = "XMLHttpRequest"),
                    r))
                      a.setRequestHeader(s, r[s]);
                    (t = function (e) {
                      return function () {
                        t &&
                          ((t =
                            n =
                            a.onload =
                            a.onerror =
                            a.onabort =
                            a.ontimeout =
                            a.onreadystatechange =
                              null),
                          "abort" === e
                            ? a.abort()
                            : "error" === e
                            ? "number" != typeof a.status
                              ? i(0, "error")
                              : i(a.status, a.statusText)
                            : i(
                                Kt[a.status] || a.status,
                                a.statusText,
                                "text" !== (a.responseType || "text") ||
                                  "string" != typeof a.responseText
                                  ? { binary: a.response }
                                  : { text: a.responseText },
                                a.getAllResponseHeaders()
                              ));
                      };
                    }),
                      (a.onload = t()),
                      (n = a.onerror = a.ontimeout = t("error")),
                      void 0 !== a.onabort
                        ? (a.onabort = n)
                        : (a.onreadystatechange = function () {
                            4 === a.readyState &&
                              o.setTimeout(function () {
                                t && n();
                              });
                          }),
                      (t = t("abort"));
                    try {
                      a.send((e.hasContent && e.data) || null);
                    } catch (e) {
                      if (t) throw e;
                    }
                  },
                  abort: function () {
                    t && t();
                  },
                };
            }),
            $.ajaxPrefilter(function (e) {
              e.crossDomain && (e.contents.script = !1);
            }),
            $.ajaxSetup({
              accepts: {
                script:
                  "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
              },
              contents: { script: /\b(?:java|ecma)script\b/ },
              converters: {
                "text script": function (e) {
                  return $.globalEval(e), e;
                },
              },
            }),
            $.ajaxPrefilter("script", function (e) {
              void 0 === e.cache && (e.cache = !1),
                e.crossDomain && (e.type = "GET");
            }),
            $.ajaxTransport("script", function (e) {
              var t, n;
              if (e.crossDomain || e.scriptAttrs)
                return {
                  send: function (o, r) {
                    (t = $("<script>")
                      .attr(e.scriptAttrs || {})
                      .prop({ charset: e.scriptCharset, src: e.url })
                      .on(
                        "load error",
                        (n = function (e) {
                          t.remove(),
                            (n = null),
                            e && r("error" === e.type ? 404 : 200, e.type);
                        })
                      )),
                      b.head.appendChild(t[0]);
                  },
                  abort: function () {
                    n && n();
                  },
                };
            });
          var en,
            tn = [],
            nn = /(=)\?(?=&|$)|\?\?/;
          $.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function () {
              var e = tn.pop() || $.expando + "_" + qt.guid++;
              return (this[e] = !0), e;
            },
          }),
            $.ajaxPrefilter("json jsonp", function (e, t, n) {
              var r,
                i,
                s,
                a =
                  !1 !== e.jsonp &&
                  (nn.test(e.url)
                    ? "url"
                    : "string" == typeof e.data &&
                      0 ===
                        (e.contentType || "").indexOf(
                          "application/x-www-form-urlencoded"
                        ) &&
                      nn.test(e.data) &&
                      "data");
              if (a || "jsonp" === e.dataTypes[0])
                return (
                  (r = e.jsonpCallback =
                    v(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback),
                  a
                    ? (e[a] = e[a].replace(nn, "$1" + r))
                    : !1 !== e.jsonp &&
                      (e.url +=
                        (At.test(e.url) ? "&" : "?") + e.jsonp + "=" + r),
                  (e.converters["script json"] = function () {
                    return s || $.error(r + " was not called"), s[0];
                  }),
                  (e.dataTypes[0] = "json"),
                  (i = o[r]),
                  (o[r] = function () {
                    s = arguments;
                  }),
                  n.always(function () {
                    void 0 === i ? $(o).removeProp(r) : (o[r] = i),
                      e[r] && ((e.jsonpCallback = t.jsonpCallback), tn.push(r)),
                      s && v(i) && i(s[0]),
                      (s = i = void 0);
                  }),
                  "script"
                );
            }),
            (m.createHTMLDocument =
              (((en = b.implementation.createHTMLDocument("").body).innerHTML =
                "<form></form><form></form>"),
              2 === en.childNodes.length)),
            ($.parseHTML = function (e, t, n) {
              return "string" != typeof e
                ? []
                : ("boolean" == typeof t && ((n = t), (t = !1)),
                  t ||
                    (m.createHTMLDocument
                      ? (((o = (t =
                          b.implementation.createHTMLDocument(
                            ""
                          )).createElement("base")).href = b.location.href),
                        t.head.appendChild(o))
                      : (t = b)),
                  (i = !n && []),
                  (r = H.exec(e))
                    ? [t.createElement(r[1])]
                    : ((r = Pe([e], t, i)),
                      i && i.length && $(i).remove(),
                      $.merge([], r.childNodes)));
              var o, r, i;
            }),
            ($.fn.load = function (e, t, n) {
              var o,
                r,
                i,
                s = this,
                a = e.indexOf(" ");
              return (
                a > -1 && ((o = $t(e.slice(a))), (e = e.slice(0, a))),
                v(t)
                  ? ((n = t), (t = void 0))
                  : t && "object" == typeof t && (r = "POST"),
                s.length > 0 &&
                  $.ajax({
                    url: e,
                    type: r || "GET",
                    dataType: "html",
                    data: t,
                  })
                    .done(function (e) {
                      (i = arguments),
                        s.html(
                          o ? $("<div>").append($.parseHTML(e)).find(o) : e
                        );
                    })
                    .always(
                      n &&
                        function (e, t) {
                          s.each(function () {
                            n.apply(this, i || [e.responseText, t, e]);
                          });
                        }
                    ),
                this
              );
            }),
            ($.expr.pseudos.animated = function (e) {
              return $.grep($.timers, function (t) {
                return e === t.elem;
              }).length;
            }),
            ($.offset = {
              setOffset: function (e, t, n) {
                var o,
                  r,
                  i,
                  s,
                  a,
                  c,
                  u = $.css(e, "position"),
                  l = $(e),
                  d = {};
                "static" === u && (e.style.position = "relative"),
                  (a = l.offset()),
                  (i = $.css(e, "top")),
                  (c = $.css(e, "left")),
                  ("absolute" === u || "fixed" === u) &&
                  (i + c).indexOf("auto") > -1
                    ? ((s = (o = l.position()).top), (r = o.left))
                    : ((s = parseFloat(i) || 0), (r = parseFloat(c) || 0)),
                  v(t) && (t = t.call(e, n, $.extend({}, a))),
                  null != t.top && (d.top = t.top - a.top + s),
                  null != t.left && (d.left = t.left - a.left + r),
                  "using" in t ? t.using.call(e, d) : l.css(d);
              },
            }),
            $.fn.extend({
              offset: function (e) {
                if (arguments.length)
                  return void 0 === e
                    ? this
                    : this.each(function (t) {
                        $.offset.setOffset(this, e, t);
                      });
                var t,
                  n,
                  o = this[0];
                return o
                  ? o.getClientRects().length
                    ? ((t = o.getBoundingClientRect()),
                      (n = o.ownerDocument.defaultView),
                      {
                        top: t.top + n.pageYOffset,
                        left: t.left + n.pageXOffset,
                      })
                    : { top: 0, left: 0 }
                  : void 0;
              },
              position: function () {
                if (this[0]) {
                  var e,
                    t,
                    n,
                    o = this[0],
                    r = { top: 0, left: 0 };
                  if ("fixed" === $.css(o, "position"))
                    t = o.getBoundingClientRect();
                  else {
                    for (
                      t = this.offset(),
                        n = o.ownerDocument,
                        e = o.offsetParent || n.documentElement;
                      e &&
                      (e === n.body || e === n.documentElement) &&
                      "static" === $.css(e, "position");

                    )
                      e = e.parentNode;
                    e &&
                      e !== o &&
                      1 === e.nodeType &&
                      (((r = $(e).offset()).top += $.css(
                        e,
                        "borderTopWidth",
                        !0
                      )),
                      (r.left += $.css(e, "borderLeftWidth", !0)));
                  }
                  return {
                    top: t.top - r.top - $.css(o, "marginTop", !0),
                    left: t.left - r.left - $.css(o, "marginLeft", !0),
                  };
                }
              },
              offsetParent: function () {
                return this.map(function () {
                  for (
                    var e = this.offsetParent;
                    e && "static" === $.css(e, "position");

                  )
                    e = e.offsetParent;
                  return e || ge;
                });
              },
            }),
            $.each(
              { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" },
              function (e, t) {
                var n = "pageYOffset" === t;
                $.fn[e] = function (o) {
                  return ee(
                    this,
                    function (e, o, r) {
                      var i;
                      if (
                        (y(e)
                          ? (i = e)
                          : 9 === e.nodeType && (i = e.defaultView),
                        void 0 === r)
                      )
                        return i ? i[t] : e[o];
                      i
                        ? i.scrollTo(
                            n ? i.pageXOffset : r,
                            n ? r : i.pageYOffset
                          )
                        : (e[o] = r);
                    },
                    e,
                    o,
                    arguments.length
                  );
                };
              }
            ),
            $.each(["top", "left"], function (e, t) {
              $.cssHooks[t] = et(m.pixelPosition, function (e, n) {
                if (n)
                  return (
                    (n = Ze(e, t)), Je.test(n) ? $(e).position()[t] + "px" : n
                  );
              });
            }),
            $.each({ Height: "height", Width: "width" }, function (e, t) {
              $.each(
                { padding: "inner" + e, content: t, "": "outer" + e },
                function (n, o) {
                  $.fn[o] = function (r, i) {
                    var s = arguments.length && (n || "boolean" != typeof r),
                      a = n || (!0 === r || !0 === i ? "margin" : "border");
                    return ee(
                      this,
                      function (t, n, r) {
                        var i;
                        return y(t)
                          ? 0 === o.indexOf("outer")
                            ? t["inner" + e]
                            : t.document.documentElement["client" + e]
                          : 9 === t.nodeType
                          ? ((i = t.documentElement),
                            Math.max(
                              t.body["scroll" + e],
                              i["scroll" + e],
                              t.body["offset" + e],
                              i["offset" + e],
                              i["client" + e]
                            ))
                          : void 0 === r
                          ? $.css(t, n, a)
                          : $.style(t, n, r, a);
                      },
                      t,
                      s ? r : void 0,
                      s
                    );
                  };
                }
              );
            }),
            $.each(
              [
                "ajaxStart",
                "ajaxStop",
                "ajaxComplete",
                "ajaxError",
                "ajaxSuccess",
                "ajaxSend",
              ],
              function (e, t) {
                $.fn[t] = function (e) {
                  return this.on(t, e);
                };
              }
            ),
            $.fn.extend({
              bind: function (e, t, n) {
                return this.on(e, null, t, n);
              },
              unbind: function (e, t) {
                return this.off(e, null, t);
              },
              delegate: function (e, t, n, o) {
                return this.on(t, e, n, o);
              },
              undelegate: function (e, t, n) {
                return 1 === arguments.length
                  ? this.off(e, "**")
                  : this.off(t, e || "**", n);
              },
              hover: function (e, t) {
                return this.on("mouseenter", e).on("mouseleave", t || e);
              },
            }),
            $.each(
              "blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(
                " "
              ),
              function (e, t) {
                $.fn[t] = function (e, n) {
                  return arguments.length > 0
                    ? this.on(t, null, e, n)
                    : this.trigger(t);
                };
              }
            );
          var on = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;
          ($.proxy = function (e, t) {
            var n, o, r;
            if (("string" == typeof t && ((n = e[t]), (t = e), (e = n)), v(e)))
              return (
                (o = a.call(arguments, 2)),
                (r = function () {
                  return e.apply(t || this, o.concat(a.call(arguments)));
                }),
                (r.guid = e.guid = e.guid || $.guid++),
                r
              );
          }),
            ($.holdReady = function (e) {
              e ? $.readyWait++ : $.ready(!0);
            }),
            ($.isArray = Array.isArray),
            ($.parseJSON = JSON.parse),
            ($.nodeName = T),
            ($.isFunction = v),
            ($.isWindow = y),
            ($.camelCase = re),
            ($.type = _),
            ($.now = Date.now),
            ($.isNumeric = function (e) {
              var t = $.type(e);
              return (
                ("number" === t || "string" === t) && !isNaN(e - parseFloat(e))
              );
            }),
            ($.trim = function (e) {
              return null == e ? "" : (e + "").replace(on, "$1");
            }),
            void 0 ===
              (n = function () {
                return $;
              }.apply(t, [])) || (e.exports = n);
          var rn = o.jQuery,
            sn = o.$;
          return (
            ($.noConflict = function (e) {
              return (
                o.$ === $ && (o.$ = sn),
                e && o.jQuery === $ && (o.jQuery = rn),
                $
              );
            }),
            void 0 === r && (o.jQuery = o.$ = $),
            $
          );
        });
      },
      813: function (e) {
        e.exports = (function () {
          "use strict";
          var e =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      "function" == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  },
            t = function (e, t) {
              if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function");
            },
            n = (function () {
              function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                  var o = t[n];
                  (o.enumerable = o.enumerable || !1),
                    (o.configurable = !0),
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o);
                }
              }
              return function (t, n, o) {
                return n && e(t.prototype, n), o && e(t, o), t;
              };
            })(),
            o =
              Object.assign ||
              function (e) {
                for (var t = 1; t < arguments.length; t++) {
                  var n = arguments[t];
                  for (var o in n)
                    Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
                }
                return e;
              },
            r = (function () {
              function e(n) {
                var o =
                    !(arguments.length > 1 && void 0 !== arguments[1]) ||
                    arguments[1],
                  r =
                    arguments.length > 2 && void 0 !== arguments[2]
                      ? arguments[2]
                      : [],
                  i =
                    arguments.length > 3 && void 0 !== arguments[3]
                      ? arguments[3]
                      : 5e3;
                t(this, e),
                  (this.ctx = n),
                  (this.iframes = o),
                  (this.exclude = r),
                  (this.iframesTimeout = i);
              }
              return (
                n(
                  e,
                  [
                    {
                      key: "getContexts",
                      value: function () {
                        var e = [];
                        return (
                          (void 0 !== this.ctx && this.ctx
                            ? NodeList.prototype.isPrototypeOf(this.ctx)
                              ? Array.prototype.slice.call(this.ctx)
                              : Array.isArray(this.ctx)
                              ? this.ctx
                              : "string" == typeof this.ctx
                              ? Array.prototype.slice.call(
                                  document.querySelectorAll(this.ctx)
                                )
                              : [this.ctx]
                            : []
                          ).forEach(function (t) {
                            var n =
                              e.filter(function (e) {
                                return e.contains(t);
                              }).length > 0;
                            -1 !== e.indexOf(t) || n || e.push(t);
                          }),
                          e
                        );
                      },
                    },
                    {
                      key: "getIframeContents",
                      value: function (e, t) {
                        var n =
                            arguments.length > 2 && void 0 !== arguments[2]
                              ? arguments[2]
                              : function () {},
                          o = void 0;
                        try {
                          var r = e.contentWindow;
                          if (((o = r.document), !r || !o))
                            throw new Error("iframe inaccessible");
                        } catch (e) {
                          n();
                        }
                        o && t(o);
                      },
                    },
                    {
                      key: "isIframeBlank",
                      value: function (e) {
                        var t = "about:blank",
                          n = e.getAttribute("src").trim();
                        return (
                          e.contentWindow.location.href === t && n !== t && n
                        );
                      },
                    },
                    {
                      key: "observeIframeLoad",
                      value: function (e, t, n) {
                        var o = this,
                          r = !1,
                          i = null,
                          s = function s() {
                            if (!r) {
                              (r = !0), clearTimeout(i);
                              try {
                                o.isIframeBlank(e) ||
                                  (e.removeEventListener("load", s),
                                  o.getIframeContents(e, t, n));
                              } catch (e) {
                                n();
                              }
                            }
                          };
                        e.addEventListener("load", s),
                          (i = setTimeout(s, this.iframesTimeout));
                      },
                    },
                    {
                      key: "onIframeReady",
                      value: function (e, t, n) {
                        try {
                          "complete" === e.contentWindow.document.readyState
                            ? this.isIframeBlank(e)
                              ? this.observeIframeLoad(e, t, n)
                              : this.getIframeContents(e, t, n)
                            : this.observeIframeLoad(e, t, n);
                        } catch (e) {
                          n();
                        }
                      },
                    },
                    {
                      key: "waitForIframes",
                      value: function (e, t) {
                        var n = this,
                          o = 0;
                        this.forEachIframe(
                          e,
                          function () {
                            return !0;
                          },
                          function (e) {
                            o++,
                              n.waitForIframes(
                                e.querySelector("html"),
                                function () {
                                  --o || t();
                                }
                              );
                          },
                          function (e) {
                            e || t();
                          }
                        );
                      },
                    },
                    {
                      key: "forEachIframe",
                      value: function (t, n, o) {
                        var r = this,
                          i =
                            arguments.length > 3 && void 0 !== arguments[3]
                              ? arguments[3]
                              : function () {},
                          s = t.querySelectorAll("iframe"),
                          a = s.length,
                          c = 0;
                        s = Array.prototype.slice.call(s);
                        var u = function () {
                          --a <= 0 && i(c);
                        };
                        a || u(),
                          s.forEach(function (t) {
                            e.matches(t, r.exclude)
                              ? u()
                              : r.onIframeReady(
                                  t,
                                  function (e) {
                                    n(t) && (c++, o(e)), u();
                                  },
                                  u
                                );
                          });
                      },
                    },
                    {
                      key: "createIterator",
                      value: function (e, t, n) {
                        return document.createNodeIterator(e, t, n, !1);
                      },
                    },
                    {
                      key: "createInstanceOnIframe",
                      value: function (t) {
                        return new e(t.querySelector("html"), this.iframes);
                      },
                    },
                    {
                      key: "compareNodeIframe",
                      value: function (e, t, n) {
                        if (
                          e.compareDocumentPosition(n) &
                          Node.DOCUMENT_POSITION_PRECEDING
                        ) {
                          if (null === t) return !0;
                          if (
                            t.compareDocumentPosition(n) &
                            Node.DOCUMENT_POSITION_FOLLOWING
                          )
                            return !0;
                        }
                        return !1;
                      },
                    },
                    {
                      key: "getIteratorNode",
                      value: function (e) {
                        var t = e.previousNode();
                        return {
                          prevNode: t,
                          node: (null === t || e.nextNode()) && e.nextNode(),
                        };
                      },
                    },
                    {
                      key: "checkIframeFilter",
                      value: function (e, t, n, o) {
                        var r = !1,
                          i = !1;
                        return (
                          o.forEach(function (e, t) {
                            e.val === n && ((r = t), (i = e.handled));
                          }),
                          this.compareNodeIframe(e, t, n)
                            ? (!1 !== r || i
                                ? !1 === r || i || (o[r].handled = !0)
                                : o.push({ val: n, handled: !0 }),
                              !0)
                            : (!1 === r && o.push({ val: n, handled: !1 }), !1)
                        );
                      },
                    },
                    {
                      key: "handleOpenIframes",
                      value: function (e, t, n, o) {
                        var r = this;
                        e.forEach(function (e) {
                          e.handled ||
                            r.getIframeContents(e.val, function (e) {
                              r.createInstanceOnIframe(e).forEachNode(t, n, o);
                            });
                        });
                      },
                    },
                    {
                      key: "iterateThroughNodes",
                      value: function (e, t, n, o, r) {
                        for (
                          var i = this,
                            s = this.createIterator(t, e, o),
                            a = [],
                            c = [],
                            u = void 0,
                            l = void 0,
                            d = function () {
                              var e = i.getIteratorNode(s);
                              return (l = e.prevNode), (u = e.node);
                            };
                          d();

                        )
                          this.iframes &&
                            this.forEachIframe(
                              t,
                              function (e) {
                                return i.checkIframeFilter(u, l, e, a);
                              },
                              function (t) {
                                i.createInstanceOnIframe(t).forEachNode(
                                  e,
                                  function (e) {
                                    return c.push(e);
                                  },
                                  o
                                );
                              }
                            ),
                            c.push(u);
                        c.forEach(function (e) {
                          n(e);
                        }),
                          this.iframes && this.handleOpenIframes(a, e, n, o),
                          r();
                      },
                    },
                    {
                      key: "forEachNode",
                      value: function (e, t, n) {
                        var o = this,
                          r =
                            arguments.length > 3 && void 0 !== arguments[3]
                              ? arguments[3]
                              : function () {},
                          i = this.getContexts(),
                          s = i.length;
                        s || r(),
                          i.forEach(function (i) {
                            var a = function () {
                              o.iterateThroughNodes(e, i, t, n, function () {
                                --s <= 0 && r();
                              });
                            };
                            o.iframes ? o.waitForIframes(i, a) : a();
                          });
                      },
                    },
                  ],
                  [
                    {
                      key: "matches",
                      value: function (e, t) {
                        var n = "string" == typeof t ? [t] : t,
                          o =
                            e.matches ||
                            e.matchesSelector ||
                            e.msMatchesSelector ||
                            e.mozMatchesSelector ||
                            e.oMatchesSelector ||
                            e.webkitMatchesSelector;
                        if (o) {
                          var r = !1;
                          return (
                            n.every(function (t) {
                              return !o.call(e, t) || ((r = !0), !1);
                            }),
                            r
                          );
                        }
                        return !1;
                      },
                    },
                  ]
                ),
                e
              );
            })(),
            i = (function () {
              function i(e) {
                t(this, i), (this.ctx = e), (this.ie = !1);
                var n = window.navigator.userAgent;
                (n.indexOf("MSIE") > -1 || n.indexOf("Trident") > -1) &&
                  (this.ie = !0);
              }
              return (
                n(i, [
                  {
                    key: "log",
                    value: function (t) {
                      var n =
                          arguments.length > 1 && void 0 !== arguments[1]
                            ? arguments[1]
                            : "debug",
                        o = this.opt.log;
                      this.opt.debug &&
                        "object" === (void 0 === o ? "undefined" : e(o)) &&
                        "function" == typeof o[n] &&
                        o[n]("mark.js: " + t);
                    },
                  },
                  {
                    key: "escapeStr",
                    value: function (e) {
                      return e.replace(
                        /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,
                        "\\$&"
                      );
                    },
                  },
                  {
                    key: "createRegExp",
                    value: function (e) {
                      return (
                        "disabled" !== this.opt.wildcards &&
                          (e = this.setupWildcardsRegExp(e)),
                        (e = this.escapeStr(e)),
                        Object.keys(this.opt.synonyms).length &&
                          (e = this.createSynonymsRegExp(e)),
                        (this.opt.ignoreJoiners ||
                          this.opt.ignorePunctuation.length) &&
                          (e = this.setupIgnoreJoinersRegExp(e)),
                        this.opt.diacritics &&
                          (e = this.createDiacriticsRegExp(e)),
                        (e = this.createMergedBlanksRegExp(e)),
                        (this.opt.ignoreJoiners ||
                          this.opt.ignorePunctuation.length) &&
                          (e = this.createJoinersRegExp(e)),
                        "disabled" !== this.opt.wildcards &&
                          (e = this.createWildcardsRegExp(e)),
                        this.createAccuracyRegExp(e)
                      );
                    },
                  },
                  {
                    key: "createSynonymsRegExp",
                    value: function (e) {
                      var t = this.opt.synonyms,
                        n = this.opt.caseSensitive ? "" : "i",
                        o =
                          this.opt.ignoreJoiners ||
                          this.opt.ignorePunctuation.length
                            ? "\0"
                            : "";
                      for (var r in t)
                        if (t.hasOwnProperty(r)) {
                          var i = t[r],
                            s =
                              "disabled" !== this.opt.wildcards
                                ? this.setupWildcardsRegExp(r)
                                : this.escapeStr(r),
                            a =
                              "disabled" !== this.opt.wildcards
                                ? this.setupWildcardsRegExp(i)
                                : this.escapeStr(i);
                          "" !== s &&
                            "" !== a &&
                            (e = e.replace(
                              new RegExp(
                                "(" +
                                  this.escapeStr(s) +
                                  "|" +
                                  this.escapeStr(a) +
                                  ")",
                                "gm" + n
                              ),
                              o +
                                "(" +
                                this.processSynomyms(s) +
                                "|" +
                                this.processSynomyms(a) +
                                ")" +
                                o
                            ));
                        }
                      return e;
                    },
                  },
                  {
                    key: "processSynomyms",
                    value: function (e) {
                      return (
                        (this.opt.ignoreJoiners ||
                          this.opt.ignorePunctuation.length) &&
                          (e = this.setupIgnoreJoinersRegExp(e)),
                        e
                      );
                    },
                  },
                  {
                    key: "setupWildcardsRegExp",
                    value: function (e) {
                      return (e = e.replace(/(?:\\)*\?/g, function (e) {
                        return "\\" === e.charAt(0) ? "?" : "";
                      })).replace(/(?:\\)*\*/g, function (e) {
                        return "\\" === e.charAt(0) ? "*" : "";
                      });
                    },
                  },
                  {
                    key: "createWildcardsRegExp",
                    value: function (e) {
                      var t = "withSpaces" === this.opt.wildcards;
                      return e
                        .replace(/\u0001/g, t ? "[\\S\\s]?" : "\\S?")
                        .replace(/\u0002/g, t ? "[\\S\\s]*?" : "\\S*");
                    },
                  },
                  {
                    key: "setupIgnoreJoinersRegExp",
                    value: function (e) {
                      return e.replace(/[^(|)\\]/g, function (e, t, n) {
                        var o = n.charAt(t + 1);
                        return /[(|)\\]/.test(o) || "" === o ? e : e + "\0";
                      });
                    },
                  },
                  {
                    key: "createJoinersRegExp",
                    value: function (e) {
                      var t = [],
                        n = this.opt.ignorePunctuation;
                      return (
                        Array.isArray(n) &&
                          n.length &&
                          t.push(this.escapeStr(n.join(""))),
                        this.opt.ignoreJoiners &&
                          t.push("\\u00ad\\u200b\\u200c\\u200d"),
                        t.length
                          ? e.split(/\u0000+/).join("[" + t.join("") + "]*")
                          : e
                      );
                    },
                  },
                  {
                    key: "createDiacriticsRegExp",
                    value: function (e) {
                      var t = this.opt.caseSensitive ? "" : "i",
                        n = this.opt.caseSensitive
                          ? [
                              "aàáảãạăằắẳẵặâầấẩẫậäåāą",
                              "AÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ",
                              "cçćč",
                              "CÇĆČ",
                              "dđď",
                              "DĐĎ",
                              "eèéẻẽẹêềếểễệëěēę",
                              "EÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ",
                              "iìíỉĩịîïī",
                              "IÌÍỈĨỊÎÏĪ",
                              "lł",
                              "LŁ",
                              "nñňń",
                              "NÑŇŃ",
                              "oòóỏõọôồốổỗộơởỡớờợöøō",
                              "OÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ",
                              "rř",
                              "RŘ",
                              "sšśșş",
                              "SŠŚȘŞ",
                              "tťțţ",
                              "TŤȚŢ",
                              "uùúủũụưừứửữựûüůū",
                              "UÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ",
                              "yýỳỷỹỵÿ",
                              "YÝỲỶỸỴŸ",
                              "zžżź",
                              "ZŽŻŹ",
                            ]
                          : [
                              "aàáảãạăằắẳẵặâầấẩẫậäåāąAÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ",
                              "cçćčCÇĆČ",
                              "dđďDĐĎ",
                              "eèéẻẽẹêềếểễệëěēęEÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ",
                              "iìíỉĩịîïīIÌÍỈĨỊÎÏĪ",
                              "lłLŁ",
                              "nñňńNÑŇŃ",
                              "oòóỏõọôồốổỗộơởỡớờợöøōOÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ",
                              "rřRŘ",
                              "sšśșşSŠŚȘŞ",
                              "tťțţTŤȚŢ",
                              "uùúủũụưừứửữựûüůūUÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ",
                              "yýỳỷỹỵÿYÝỲỶỸỴŸ",
                              "zžżźZŽŻŹ",
                            ],
                        o = [];
                      return (
                        e.split("").forEach(function (r) {
                          n.every(function (n) {
                            if (-1 !== n.indexOf(r)) {
                              if (o.indexOf(n) > -1) return !1;
                              (e = e.replace(
                                new RegExp("[" + n + "]", "gm" + t),
                                "[" + n + "]"
                              )),
                                o.push(n);
                            }
                            return !0;
                          });
                        }),
                        e
                      );
                    },
                  },
                  {
                    key: "createMergedBlanksRegExp",
                    value: function (e) {
                      return e.replace(/[\s]+/gim, "[\\s]+");
                    },
                  },
                  {
                    key: "createAccuracyRegExp",
                    value: function (e) {
                      var t = this,
                        n = this.opt.accuracy,
                        o = "string" == typeof n ? n : n.value,
                        r = "string" == typeof n ? [] : n.limiters,
                        i = "";
                      switch (
                        (r.forEach(function (e) {
                          i += "|" + t.escapeStr(e);
                        }),
                        o)
                      ) {
                        case "partially":
                        default:
                          return "()(" + e + ")";
                        case "complementary":
                          return (
                            "()([^" +
                            (i =
                              "\\s" +
                              (i ||
                                this.escapeStr(
                                  "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~¡¿"
                                ))) +
                            "]*" +
                            e +
                            "[^" +
                            i +
                            "]*)"
                          );
                        case "exactly":
                          return (
                            "(^|\\s" + i + ")(" + e + ")(?=$|\\s" + i + ")"
                          );
                      }
                    },
                  },
                  {
                    key: "getSeparatedKeywords",
                    value: function (e) {
                      var t = this,
                        n = [];
                      return (
                        e.forEach(function (e) {
                          t.opt.separateWordSearch
                            ? e.split(" ").forEach(function (e) {
                                e.trim() && -1 === n.indexOf(e) && n.push(e);
                              })
                            : e.trim() && -1 === n.indexOf(e) && n.push(e);
                        }),
                        {
                          keywords: n.sort(function (e, t) {
                            return t.length - e.length;
                          }),
                          length: n.length,
                        }
                      );
                    },
                  },
                  {
                    key: "isNumeric",
                    value: function (e) {
                      return Number(parseFloat(e)) == e;
                    },
                  },
                  {
                    key: "checkRanges",
                    value: function (e) {
                      var t = this;
                      if (
                        !Array.isArray(e) ||
                        "[object Object]" !==
                          Object.prototype.toString.call(e[0])
                      )
                        return (
                          this.log(
                            "markRanges() will only accept an array of objects"
                          ),
                          this.opt.noMatch(e),
                          []
                        );
                      var n = [],
                        o = 0;
                      return (
                        e
                          .sort(function (e, t) {
                            return e.start - t.start;
                          })
                          .forEach(function (e) {
                            var r = t.callNoMatchOnInvalidRanges(e, o),
                              i = r.start,
                              s = r.end;
                            r.valid &&
                              ((e.start = i),
                              (e.length = s - i),
                              n.push(e),
                              (o = s));
                          }),
                        n
                      );
                    },
                  },
                  {
                    key: "callNoMatchOnInvalidRanges",
                    value: function (e, t) {
                      var n = void 0,
                        o = void 0,
                        r = !1;
                      return (
                        e && void 0 !== e.start
                          ? ((o =
                              (n = parseInt(e.start, 10)) +
                              parseInt(e.length, 10)),
                            this.isNumeric(e.start) &&
                            this.isNumeric(e.length) &&
                            o - t > 0 &&
                            o - n > 0
                              ? (r = !0)
                              : (this.log(
                                  "Ignoring invalid or overlapping range: " +
                                    JSON.stringify(e)
                                ),
                                this.opt.noMatch(e)))
                          : (this.log(
                              "Ignoring invalid range: " + JSON.stringify(e)
                            ),
                            this.opt.noMatch(e)),
                        { start: n, end: o, valid: r }
                      );
                    },
                  },
                  {
                    key: "checkWhitespaceRanges",
                    value: function (e, t, n) {
                      var o = void 0,
                        r = !0,
                        i = n.length,
                        s = t - i,
                        a = parseInt(e.start, 10) - s;
                      return (
                        (o = (a = a > i ? i : a) + parseInt(e.length, 10)) >
                          i &&
                          ((o = i),
                          this.log(
                            "End range automatically set to the max value of " +
                              i
                          )),
                        a < 0 || o - a < 0 || a > i || o > i
                          ? ((r = !1),
                            this.log("Invalid range: " + JSON.stringify(e)),
                            this.opt.noMatch(e))
                          : "" === n.substring(a, o).replace(/\s+/g, "") &&
                            ((r = !1),
                            this.log(
                              "Skipping whitespace only range: " +
                                JSON.stringify(e)
                            ),
                            this.opt.noMatch(e)),
                        { start: a, end: o, valid: r }
                      );
                    },
                  },
                  {
                    key: "getTextNodes",
                    value: function (e) {
                      var t = this,
                        n = "",
                        o = [];
                      this.iterator.forEachNode(
                        NodeFilter.SHOW_TEXT,
                        function (e) {
                          o.push({
                            start: n.length,
                            end: (n += e.textContent).length,
                            node: e,
                          });
                        },
                        function (e) {
                          return t.matchesExclude(e.parentNode)
                            ? NodeFilter.FILTER_REJECT
                            : NodeFilter.FILTER_ACCEPT;
                        },
                        function () {
                          e({ value: n, nodes: o });
                        }
                      );
                    },
                  },
                  {
                    key: "matchesExclude",
                    value: function (e) {
                      return r.matches(
                        e,
                        this.opt.exclude.concat([
                          "script",
                          "style",
                          "title",
                          "head",
                          "html",
                        ])
                      );
                    },
                  },
                  {
                    key: "wrapRangeInTextNode",
                    value: function (e, t, n) {
                      var o = this.opt.element ? this.opt.element : "mark",
                        r = e.splitText(t),
                        i = r.splitText(n - t),
                        s = document.createElement(o);
                      return (
                        s.setAttribute("data-markjs", "true"),
                        this.opt.className &&
                          s.setAttribute("class", this.opt.className),
                        (s.textContent = r.textContent),
                        r.parentNode.replaceChild(s, r),
                        i
                      );
                    },
                  },
                  {
                    key: "wrapRangeInMappedTextNode",
                    value: function (e, t, n, o, r) {
                      var i = this;
                      e.nodes.every(function (s, a) {
                        var c = e.nodes[a + 1];
                        if (void 0 === c || c.start > t) {
                          if (!o(s.node)) return !1;
                          var u = t - s.start,
                            l = (n > s.end ? s.end : n) - s.start,
                            d = e.value.substr(0, s.start),
                            f = e.value.substr(l + s.start);
                          if (
                            ((s.node = i.wrapRangeInTextNode(s.node, u, l)),
                            (e.value = d + f),
                            e.nodes.forEach(function (t, n) {
                              n >= a &&
                                (e.nodes[n].start > 0 &&
                                  n !== a &&
                                  (e.nodes[n].start -= l),
                                (e.nodes[n].end -= l));
                            }),
                            (n -= l),
                            r(s.node.previousSibling, s.start),
                            !(n > s.end))
                          )
                            return !1;
                          t = s.end;
                        }
                        return !0;
                      });
                    },
                  },
                  {
                    key: "wrapMatches",
                    value: function (e, t, n, o, r) {
                      var i = this,
                        s = 0 === t ? 0 : t + 1;
                      this.getTextNodes(function (t) {
                        t.nodes.forEach(function (t) {
                          t = t.node;
                          for (
                            var r = void 0;
                            null !== (r = e.exec(t.textContent)) && "" !== r[s];

                          )
                            if (n(r[s], t)) {
                              var a = r.index;
                              if (0 !== s)
                                for (var c = 1; c < s; c++) a += r[c].length;
                              (t = i.wrapRangeInTextNode(
                                t,
                                a,
                                a + r[s].length
                              )),
                                o(t.previousSibling),
                                (e.lastIndex = 0);
                            }
                        }),
                          r();
                      });
                    },
                  },
                  {
                    key: "wrapMatchesAcrossElements",
                    value: function (e, t, n, o, r) {
                      var i = this,
                        s = 0 === t ? 0 : t + 1;
                      this.getTextNodes(function (t) {
                        for (
                          var a = void 0;
                          null !== (a = e.exec(t.value)) && "" !== a[s];

                        ) {
                          var c = a.index;
                          if (0 !== s)
                            for (var u = 1; u < s; u++) c += a[u].length;
                          var l = c + a[s].length;
                          i.wrapRangeInMappedTextNode(
                            t,
                            c,
                            l,
                            function (e) {
                              return n(a[s], e);
                            },
                            function (t, n) {
                              (e.lastIndex = n), o(t);
                            }
                          );
                        }
                        r();
                      });
                    },
                  },
                  {
                    key: "wrapRangeFromIndex",
                    value: function (e, t, n, o) {
                      var r = this;
                      this.getTextNodes(function (i) {
                        var s = i.value.length;
                        e.forEach(function (e, o) {
                          var a = r.checkWhitespaceRanges(e, s, i.value),
                            c = a.start,
                            u = a.end;
                          a.valid &&
                            r.wrapRangeInMappedTextNode(
                              i,
                              c,
                              u,
                              function (n) {
                                return t(n, e, i.value.substring(c, u), o);
                              },
                              function (t) {
                                n(t, e);
                              }
                            );
                        }),
                          o();
                      });
                    },
                  },
                  {
                    key: "unwrapMatches",
                    value: function (e) {
                      for (
                        var t = e.parentNode,
                          n = document.createDocumentFragment();
                        e.firstChild;

                      )
                        n.appendChild(e.removeChild(e.firstChild));
                      t.replaceChild(n, e),
                        this.ie ? this.normalizeTextNode(t) : t.normalize();
                    },
                  },
                  {
                    key: "normalizeTextNode",
                    value: function (e) {
                      if (e) {
                        if (3 === e.nodeType)
                          for (
                            ;
                            e.nextSibling && 3 === e.nextSibling.nodeType;

                          )
                            (e.nodeValue += e.nextSibling.nodeValue),
                              e.parentNode.removeChild(e.nextSibling);
                        else this.normalizeTextNode(e.firstChild);
                        this.normalizeTextNode(e.nextSibling);
                      }
                    },
                  },
                  {
                    key: "markRegExp",
                    value: function (e, t) {
                      var n = this;
                      (this.opt = t),
                        this.log('Searching with expression "' + e + '"');
                      var o = 0,
                        r = "wrapMatches";
                      this.opt.acrossElements &&
                        (r = "wrapMatchesAcrossElements"),
                        this[r](
                          e,
                          this.opt.ignoreGroups,
                          function (e, t) {
                            return n.opt.filter(t, e, o);
                          },
                          function (e) {
                            o++, n.opt.each(e);
                          },
                          function () {
                            0 === o && n.opt.noMatch(e), n.opt.done(o);
                          }
                        );
                    },
                  },
                  {
                    key: "mark",
                    value: function (e, t) {
                      var n = this;
                      this.opt = t;
                      var o = 0,
                        r = "wrapMatches",
                        i = this.getSeparatedKeywords(
                          "string" == typeof e ? [e] : e
                        ),
                        s = i.keywords,
                        a = i.length,
                        c = this.opt.caseSensitive ? "" : "i";
                      this.opt.acrossElements &&
                        (r = "wrapMatchesAcrossElements"),
                        0 === a
                          ? this.opt.done(o)
                          : (function e(t) {
                              var i = new RegExp(n.createRegExp(t), "gm" + c),
                                u = 0;
                              n.log('Searching with expression "' + i + '"'),
                                n[r](
                                  i,
                                  1,
                                  function (e, r) {
                                    return n.opt.filter(r, t, o, u);
                                  },
                                  function (e) {
                                    u++, o++, n.opt.each(e);
                                  },
                                  function () {
                                    0 === u && n.opt.noMatch(t),
                                      s[a - 1] === t
                                        ? n.opt.done(o)
                                        : e(s[s.indexOf(t) + 1]);
                                  }
                                );
                            })(s[0]);
                    },
                  },
                  {
                    key: "markRanges",
                    value: function (e, t) {
                      var n = this;
                      this.opt = t;
                      var o = 0,
                        r = this.checkRanges(e);
                      r && r.length
                        ? (this.log(
                            "Starting to mark with the following ranges: " +
                              JSON.stringify(r)
                          ),
                          this.wrapRangeFromIndex(
                            r,
                            function (e, t, o, r) {
                              return n.opt.filter(e, t, o, r);
                            },
                            function (e, t) {
                              o++, n.opt.each(e, t);
                            },
                            function () {
                              n.opt.done(o);
                            }
                          ))
                        : this.opt.done(o);
                    },
                  },
                  {
                    key: "unmark",
                    value: function (e) {
                      var t = this;
                      this.opt = e;
                      var n = this.opt.element ? this.opt.element : "*";
                      (n += "[data-markjs]"),
                        this.opt.className && (n += "." + this.opt.className),
                        this.log('Removal selector "' + n + '"'),
                        this.iterator.forEachNode(
                          NodeFilter.SHOW_ELEMENT,
                          function (e) {
                            t.unwrapMatches(e);
                          },
                          function (e) {
                            var o = r.matches(e, n),
                              i = t.matchesExclude(e);
                            return !o || i
                              ? NodeFilter.FILTER_REJECT
                              : NodeFilter.FILTER_ACCEPT;
                          },
                          this.opt.done
                        );
                    },
                  },
                  {
                    key: "opt",
                    set: function (e) {
                      this._opt = o(
                        {},
                        {
                          element: "",
                          className: "",
                          exclude: [],
                          iframes: !1,
                          iframesTimeout: 5e3,
                          separateWordSearch: !0,
                          diacritics: !0,
                          synonyms: {},
                          accuracy: "partially",
                          acrossElements: !1,
                          caseSensitive: !1,
                          ignoreJoiners: !1,
                          ignoreGroups: 0,
                          ignorePunctuation: [],
                          wildcards: "disabled",
                          each: function () {},
                          noMatch: function () {},
                          filter: function () {
                            return !0;
                          },
                          done: function () {},
                          debug: !1,
                          log: window.console,
                        },
                        e
                      );
                    },
                    get: function () {
                      return this._opt;
                    },
                  },
                  {
                    key: "iterator",
                    get: function () {
                      return new r(
                        this.ctx,
                        this.opt.iframes,
                        this.opt.exclude,
                        this.opt.iframesTimeout
                      );
                    },
                  },
                ]),
                i
              );
            })();
          return function (e) {
            var t = this,
              n = new i(e);
            return (
              (this.mark = function (e, o) {
                return n.mark(e, o), t;
              }),
              (this.markRegExp = function (e, o) {
                return n.markRegExp(e, o), t;
              }),
              (this.markRanges = function (e, o) {
                return n.markRanges(e, o), t;
              }),
              (this.unmark = function (e) {
                return n.unmark(e), t;
              }),
              this
            );
          };
        })();
      },
    },
    t = {};
  function n(o) {
    var r = t[o];
    if (void 0 !== r) return r.exports;
    var i = (t[o] = { exports: {} });
    return e[o].call(i.exports, i, i.exports, n), i.exports;
  }
  (() => {
    "use strict";
    function e() {}
    function t(e, t, n, o, r) {
      e.__svelte_meta = { loc: { file: t, line: n, column: o, char: r } };
    }
    function o(e) {
      return e();
    }
    function r() {
      return Object.create(null);
    }
    function i(e) {
      e.forEach(o);
    }
    function s(e) {
      return "function" == typeof e;
    }
    function a(e, t) {
      return e != e
        ? t == t
        : e !== t || (e && "object" == typeof e) || "function" == typeof e;
    }
    let c;
    function u(e) {
      return 0 === Object.keys(e).length;
    }
    function l(t, ...n) {
      if (null == t) return e;
      const o = t.subscribe(...n);
      return o.unsubscribe ? () => o.unsubscribe() : o;
    }
    function d(e) {
      let t;
      return l(e, (e) => (t = e))(), t;
    }
    new Set();
    const f =
      "undefined" != typeof window
        ? window
        : "undefined" != typeof globalThis
        ? globalThis
        : global;
    class p {
      constructor(e) {
        (this.options = e),
          (this._listeners = "WeakMap" in f ? new WeakMap() : void 0);
      }
      observe(e, t) {
        return (
          this._listeners.set(e, t),
          this._getObserver().observe(e, this.options),
          () => {
            this._listeners.delete(e), this._observer.unobserve(e);
          }
        );
      }
      _getObserver() {
        var e;
        return null !== (e = this._observer) && void 0 !== e
          ? e
          : (this._observer = new ResizeObserver((e) => {
              var t;
              for (const n of e)
                p.entries.set(n.target, n),
                  null === (t = this._listeners.get(n.target)) ||
                    void 0 === t ||
                    t(n);
            }));
      }
    }
    p.entries = "WeakMap" in f ? new WeakMap() : void 0;
    let h,
      g = !1;
    function m(e, t, n) {
      e.insertBefore(t, n || null);
    }
    function v(e) {
      e.parentNode && e.parentNode.removeChild(e);
    }
    function y(e, t) {
      for (let n = 0; n < e.length; n += 1) e[n] && e[n].d(t);
    }
    function b(e) {
      return document.createElement(e);
    }
    function w(e) {
      return document.createTextNode(e);
    }
    function x() {
      return w(" ");
    }
    function _() {
      return w("");
    }
    function k(e, t) {
      e.value = null == t ? "" : t;
    }
    function S(e, t, n) {
      e.classList[n ? "add" : "remove"](t);
    }
    class $ {
      constructor(e = !1) {
        (this.is_svg = !1), (this.is_svg = e), (this.e = this.n = null);
      }
      c(e) {
        this.h(e);
      }
      m(e, t, n = null) {
        this.e ||
          (this.is_svg
            ? (this.e = (function (e) {
                return document.createElementNS(
                  "http://www.w3.org/2000/svg",
                  e
                );
              })(t.nodeName))
            : (this.e = b(11 === t.nodeType ? "TEMPLATE" : t.nodeName)),
          (this.t = "TEMPLATE" !== t.tagName ? t : t.content),
          this.c(e)),
          this.i(n);
      }
      h(e) {
        (this.e.innerHTML = e),
          (this.n = Array.from(
            "TEMPLATE" === this.e.nodeName
              ? this.e.content.childNodes
              : this.e.childNodes
          ));
      }
      i(e) {
        for (let t = 0; t < this.n.length; t += 1) m(this.t, this.n[t], e);
      }
      p(e) {
        this.d(), this.h(e), this.i(this.a);
      }
      d() {
        this.n.forEach(v);
      }
    }
    function E(e) {
      h = e;
    }
    function T() {
      if (!h)
        throw new Error("Function called outside component initialization");
      return h;
    }
    function C(e) {
      T().$$.on_mount.push(e);
    }
    new Map();
    const j = [],
      q = [];
    let A = [];
    const P = [],
      I = Promise.resolve();
    let N = !1;
    function O(e) {
      A.push(e);
    }
    const L = new Set();
    let M = 0;
    function R() {
      if (0 !== M) return;
      const e = h;
      do {
        try {
          for (; M < j.length; ) {
            const e = j[M];
            M++, E(e), D(e.$$);
          }
        } catch (e) {
          throw ((j.length = 0), (M = 0), e);
        }
        for (E(null), j.length = 0, M = 0; q.length; ) q.pop()();
        for (let e = 0; e < A.length; e += 1) {
          const t = A[e];
          L.has(t) || (L.add(t), t());
        }
        A.length = 0;
      } while (j.length);
      for (; P.length; ) P.pop()();
      (N = !1), L.clear(), E(e);
    }
    function D(e) {
      if (null !== e.fragment) {
        e.update(), i(e.before_update);
        const t = e.dirty;
        (e.dirty = [-1]),
          e.fragment && e.fragment.p(e.ctx, t),
          e.after_update.forEach(O);
      }
    }
    const H = new Set();
    let F, Q;
    function B() {
      F = { r: 0, c: [], p: F };
    }
    function W() {
      F.r || i(F.c), (F = F.p);
    }
    function V(e, t) {
      e && e.i && (H.delete(e), e.i(t));
    }
    function U(e, t, n, o) {
      if (e && e.o) {
        if (H.has(e)) return;
        H.add(e),
          F.c.push(() => {
            H.delete(e), o && (n && e.d(1), o());
          }),
          e.o(t);
      } else o && o();
    }
    function z(e) {
      e && e.c();
    }
    function J(e, t, n, r) {
      const { fragment: a, after_update: c } = e.$$;
      a && a.m(t, n),
        r ||
          O(() => {
            const t = e.$$.on_mount.map(o).filter(s);
            e.$$.on_destroy ? e.$$.on_destroy.push(...t) : i(t),
              (e.$$.on_mount = []);
          }),
        c.forEach(O);
    }
    function X(e, t) {
      const n = e.$$;
      null !== n.fragment &&
        ((function (e) {
          const t = [],
            n = [];
          A.forEach((o) => (-1 === e.indexOf(o) ? t.push(o) : n.push(o))),
            n.forEach((e) => e()),
            (A = t);
        })(n.after_update),
        i(n.on_destroy),
        n.fragment && n.fragment.d(t),
        (n.on_destroy = n.fragment = null),
        (n.ctx = []));
    }
    function G(t, n, o, s, a, c, u, l = [-1]) {
      const d = h;
      E(t);
      const f = (t.$$ = {
        fragment: null,
        ctx: [],
        props: c,
        update: e,
        not_equal: a,
        bound: r(),
        on_mount: [],
        on_destroy: [],
        on_disconnect: [],
        before_update: [],
        after_update: [],
        context: new Map(n.context || (d ? d.$$.context : [])),
        callbacks: r(),
        dirty: l,
        skip_bound: !1,
        root: n.target || d.$$.root,
      });
      u && u(f.root);
      let p = !1;
      if (
        ((f.ctx = o
          ? o(t, n.props || {}, (e, n, ...o) => {
              const r = o.length ? o[0] : n;
              return (
                f.ctx &&
                  a(f.ctx[e], (f.ctx[e] = r)) &&
                  (!f.skip_bound && f.bound[e] && f.bound[e](r),
                  p &&
                    (function (e, t) {
                      -1 === e.$$.dirty[0] &&
                        (j.push(e),
                        N || ((N = !0), I.then(R)),
                        e.$$.dirty.fill(0)),
                        (e.$$.dirty[(t / 31) | 0] |= 1 << t % 31);
                    })(t, e)),
                n
              );
            })
          : []),
        f.update(),
        (p = !0),
        i(f.before_update),
        (f.fragment = !!s && s(f.ctx)),
        n.target)
      ) {
        if (n.hydrate) {
          g = !0;
          const e = ((m = n.target), Array.from(m.childNodes));
          f.fragment && f.fragment.l(e), e.forEach(v);
        } else f.fragment && f.fragment.c();
        n.intro && V(t.$$.fragment),
          J(t, n.target, n.anchor, n.customElement),
          (g = !1),
          R();
      }
      var m;
      E(d);
    }
    new Set([
      "allowfullscreen",
      "allowpaymentrequest",
      "async",
      "autofocus",
      "autoplay",
      "checked",
      "controls",
      "default",
      "defer",
      "disabled",
      "formnovalidate",
      "hidden",
      "inert",
      "ismap",
      "loop",
      "multiple",
      "muted",
      "nomodule",
      "novalidate",
      "open",
      "playsinline",
      "readonly",
      "required",
      "reversed",
      "selected",
    ]),
      "function" == typeof HTMLElement &&
        (Q = class extends HTMLElement {
          constructor() {
            super(), this.attachShadow({ mode: "open" });
          }
          connectedCallback() {
            const { on_mount: e } = this.$$;
            this.$$.on_disconnect = e.map(o).filter(s);
            for (const e in this.$$.slotted)
              this.appendChild(this.$$.slotted[e]);
          }
          attributeChangedCallback(e, t, n) {
            this[e] = n;
          }
          disconnectedCallback() {
            i(this.$$.on_disconnect);
          }
          $destroy() {
            X(this, 1), (this.$destroy = e);
          }
          $on(t, n) {
            if (!s(n)) return e;
            const o = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
            return (
              o.push(n),
              () => {
                const e = o.indexOf(n);
                -1 !== e && o.splice(e, 1);
              }
            );
          }
          $set(e) {
            this.$$set &&
              !u(e) &&
              ((this.$$.skip_bound = !0),
              this.$$set(e),
              (this.$$.skip_bound = !1));
          }
        });
    class Y {
      $destroy() {
        X(this, 1), (this.$destroy = e);
      }
      $on(t, n) {
        if (!s(n)) return e;
        const o = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
        return (
          o.push(n),
          () => {
            const e = o.indexOf(n);
            -1 !== e && o.splice(e, 1);
          }
        );
      }
      $set(e) {
        this.$$set &&
          !u(e) &&
          ((this.$$.skip_bound = !0), this.$$set(e), (this.$$.skip_bound = !1));
      }
    }
    function K(e, t) {
      document.dispatchEvent(
        (function (e, t, { bubbles: n = !1, cancelable: o = !1 } = {}) {
          const r = document.createEvent("CustomEvent");
          return r.initCustomEvent(e, n, o, t), r;
        })(e, Object.assign({ version: "3.59.2" }, t), { bubbles: !0 })
      );
    }
    function Z(e, t) {
      K("SvelteDOMInsert", { target: e, node: t }),
        (function (e, t) {
          e.appendChild(t);
        })(e, t);
    }
    function ee(e, t, n) {
      K("SvelteDOMInsert", { target: e, node: t, anchor: n }), m(e, t, n);
    }
    function te(e) {
      K("SvelteDOMRemove", { node: e }), v(e);
    }
    function ne(e, t, n, o, r, i, s) {
      const a = !0 === o ? ["capture"] : o ? Array.from(Object.keys(o)) : [];
      r && a.push("preventDefault"),
        i && a.push("stopPropagation"),
        s && a.push("stopImmediatePropagation"),
        K("SvelteDOMAddEventListener", {
          node: e,
          event: t,
          handler: n,
          modifiers: a,
        });
      const c = (function (e, t, n, o) {
        return (
          e.addEventListener(t, n, o), () => e.removeEventListener(t, n, o)
        );
      })(e, t, n, o);
      return () => {
        K("SvelteDOMRemoveEventListener", {
          node: e,
          event: t,
          handler: n,
          modifiers: a,
        }),
          c();
      };
    }
    function oe(e, t, n) {
      (function (e, t, n) {
        null == n
          ? e.removeAttribute(t)
          : e.getAttribute(t) !== n && e.setAttribute(t, n);
      })(e, t, n),
        null == n
          ? K("SvelteDOMRemoveAttribute", { node: e, attribute: t })
          : K("SvelteDOMSetAttribute", { node: e, attribute: t, value: n });
    }
    function re(e, t) {
      (t = "" + t),
        e.data !== t &&
          (K("SvelteDOMSetData", { node: e, data: t }), (e.data = t));
    }
    function ie(e) {
      if (
        !("string" == typeof e || (e && "object" == typeof e && "length" in e))
      ) {
        let t = "{#each} only iterates over array-like objects.";
        throw (
          ("function" == typeof Symbol &&
            e &&
            Symbol.iterator in e &&
            (t +=
              " You can use a spread to convert this iterable into an array."),
          new Error(t))
        );
      }
    }
    function se(e, t, n) {
      for (const e of Object.keys(t)) n.indexOf(e);
    }
    class ae extends Y {
      constructor(e) {
        if (!e || (!e.target && !e.$$inline))
          throw new Error("'target' is a required option");
        super();
      }
      $destroy() {
        super.$destroy(), (this.$destroy = () => {});
      }
      $capture_state() {}
      $inject_state() {}
    }
    const ce = [];
    function ue(t, n = e) {
      let o;
      const r = new Set();
      function i(e) {
        if (a(t, e) && ((t = e), o)) {
          const e = !ce.length;
          for (const e of r) e[1](), ce.push(e, t);
          if (e) {
            for (let e = 0; e < ce.length; e += 2) ce[e][0](ce[e + 1]);
            ce.length = 0;
          }
        }
      }
      return {
        set: i,
        update: function (e) {
          i(e(t));
        },
        subscribe: function (s, a = e) {
          const c = [s, a];
          return (
            r.add(c),
            1 === r.size && (o = n(i) || e),
            s(t),
            () => {
              r.delete(c), 0 === r.size && o && (o(), (o = null));
            }
          );
        },
      };
    }
    function le(t, n, o) {
      const r = !Array.isArray(t),
        a = r ? [t] : t,
        c = n.length < 2;
      return (
        (u = (t) => {
          let o = !1;
          const u = [];
          let d = 0,
            f = e;
          const p = () => {
              if (d) return;
              f();
              const o = n(r ? u[0] : u, t);
              c ? t(o) : (f = s(o) ? o : e);
            },
            h = a.map((e, t) =>
              l(
                e,
                (e) => {
                  (u[t] = e), (d &= ~(1 << t)), o && p();
                },
                () => {
                  d |= 1 << t;
                }
              )
            );
          return (
            (o = !0),
            p(),
            function () {
              i(h), f(), (o = !1);
            }
          );
        }),
        { subscribe: ue(o, u).subscribe }
      );
      var u;
    }
    function de(e) {
      return (
        (de =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (e) {
                return typeof e;
              }
            : function (e) {
                return e &&
                  "function" == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              }),
        de(e)
      );
    }
    function fe() {
      fe = function () {
        return t;
      };
      var e,
        t = {},
        n = Object.prototype,
        o = n.hasOwnProperty,
        r =
          Object.defineProperty ||
          function (e, t, n) {
            e[t] = n.value;
          },
        i = "function" == typeof Symbol ? Symbol : {},
        s = i.iterator || "@@iterator",
        a = i.asyncIterator || "@@asyncIterator",
        c = i.toStringTag || "@@toStringTag";
      function u(e, t, n) {
        return (
          Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          }),
          e[t]
        );
      }
      try {
        u({}, "");
      } catch (e) {
        u = function (e, t, n) {
          return (e[t] = n);
        };
      }
      function l(e, t, n, o) {
        var i = t && t.prototype instanceof v ? t : v,
          s = Object.create(i.prototype),
          a = new q(o || []);
        return r(s, "_invoke", { value: E(e, n, a) }), s;
      }
      function d(e, t, n) {
        try {
          return { type: "normal", arg: e.call(t, n) };
        } catch (e) {
          return { type: "throw", arg: e };
        }
      }
      t.wrap = l;
      var f = "suspendedStart",
        p = "suspendedYield",
        h = "executing",
        g = "completed",
        m = {};
      function v() {}
      function y() {}
      function b() {}
      var w = {};
      u(w, s, function () {
        return this;
      });
      var x = Object.getPrototypeOf,
        _ = x && x(x(A([])));
      _ && _ !== n && o.call(_, s) && (w = _);
      var k = (b.prototype = v.prototype = Object.create(w));
      function S(e) {
        ["next", "throw", "return"].forEach(function (t) {
          u(e, t, function (e) {
            return this._invoke(t, e);
          });
        });
      }
      function $(e, t) {
        function n(r, i, s, a) {
          var c = d(e[r], e, i);
          if ("throw" !== c.type) {
            var u = c.arg,
              l = u.value;
            return l && "object" == de(l) && o.call(l, "__await")
              ? t.resolve(l.__await).then(
                  function (e) {
                    n("next", e, s, a);
                  },
                  function (e) {
                    n("throw", e, s, a);
                  }
                )
              : t.resolve(l).then(
                  function (e) {
                    (u.value = e), s(u);
                  },
                  function (e) {
                    return n("throw", e, s, a);
                  }
                );
          }
          a(c.arg);
        }
        var i;
        r(this, "_invoke", {
          value: function (e, o) {
            function r() {
              return new t(function (t, r) {
                n(e, o, t, r);
              });
            }
            return (i = i ? i.then(r, r) : r());
          },
        });
      }
      function E(t, n, o) {
        var r = f;
        return function (i, s) {
          if (r === h) throw new Error("Generator is already running");
          if (r === g) {
            if ("throw" === i) throw s;
            return { value: e, done: !0 };
          }
          for (o.method = i, o.arg = s; ; ) {
            var a = o.delegate;
            if (a) {
              var c = T(a, o);
              if (c) {
                if (c === m) continue;
                return c;
              }
            }
            if ("next" === o.method) o.sent = o._sent = o.arg;
            else if ("throw" === o.method) {
              if (r === f) throw ((r = g), o.arg);
              o.dispatchException(o.arg);
            } else "return" === o.method && o.abrupt("return", o.arg);
            r = h;
            var u = d(t, n, o);
            if ("normal" === u.type) {
              if (((r = o.done ? g : p), u.arg === m)) continue;
              return { value: u.arg, done: o.done };
            }
            "throw" === u.type &&
              ((r = g), (o.method = "throw"), (o.arg = u.arg));
          }
        };
      }
      function T(t, n) {
        var o = n.method,
          r = t.iterator[o];
        if (r === e)
          return (
            (n.delegate = null),
            ("throw" === o &&
              t.iterator.return &&
              ((n.method = "return"),
              (n.arg = e),
              T(t, n),
              "throw" === n.method)) ||
              ("return" !== o &&
                ((n.method = "throw"),
                (n.arg = new TypeError(
                  "The iterator does not provide a '" + o + "' method"
                )))),
            m
          );
        var i = d(r, t.iterator, n.arg);
        if ("throw" === i.type)
          return (n.method = "throw"), (n.arg = i.arg), (n.delegate = null), m;
        var s = i.arg;
        return s
          ? s.done
            ? ((n[t.resultName] = s.value),
              (n.next = t.nextLoc),
              "return" !== n.method && ((n.method = "next"), (n.arg = e)),
              (n.delegate = null),
              m)
            : s
          : ((n.method = "throw"),
            (n.arg = new TypeError("iterator result is not an object")),
            (n.delegate = null),
            m);
      }
      function C(e) {
        var t = { tryLoc: e[0] };
        1 in e && (t.catchLoc = e[1]),
          2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])),
          this.tryEntries.push(t);
      }
      function j(e) {
        var t = e.completion || {};
        (t.type = "normal"), delete t.arg, (e.completion = t);
      }
      function q(e) {
        (this.tryEntries = [{ tryLoc: "root" }]),
          e.forEach(C, this),
          this.reset(!0);
      }
      function A(t) {
        if (t || "" === t) {
          var n = t[s];
          if (n) return n.call(t);
          if ("function" == typeof t.next) return t;
          if (!isNaN(t.length)) {
            var r = -1,
              i = function n() {
                for (; ++r < t.length; )
                  if (o.call(t, r)) return (n.value = t[r]), (n.done = !1), n;
                return (n.value = e), (n.done = !0), n;
              };
            return (i.next = i);
          }
        }
        throw new TypeError(de(t) + " is not iterable");
      }
      return (
        (y.prototype = b),
        r(k, "constructor", { value: b, configurable: !0 }),
        r(b, "constructor", { value: y, configurable: !0 }),
        (y.displayName = u(b, c, "GeneratorFunction")),
        (t.isGeneratorFunction = function (e) {
          var t = "function" == typeof e && e.constructor;
          return (
            !!t &&
            (t === y || "GeneratorFunction" === (t.displayName || t.name))
          );
        }),
        (t.mark = function (e) {
          return (
            Object.setPrototypeOf
              ? Object.setPrototypeOf(e, b)
              : ((e.__proto__ = b), u(e, c, "GeneratorFunction")),
            (e.prototype = Object.create(k)),
            e
          );
        }),
        (t.awrap = function (e) {
          return { __await: e };
        }),
        S($.prototype),
        u($.prototype, a, function () {
          return this;
        }),
        (t.AsyncIterator = $),
        (t.async = function (e, n, o, r, i) {
          void 0 === i && (i = Promise);
          var s = new $(l(e, n, o, r), i);
          return t.isGeneratorFunction(n)
            ? s
            : s.next().then(function (e) {
                return e.done ? e.value : s.next();
              });
        }),
        S(k),
        u(k, c, "Generator"),
        u(k, s, function () {
          return this;
        }),
        u(k, "toString", function () {
          return "[object Generator]";
        }),
        (t.keys = function (e) {
          var t = Object(e),
            n = [];
          for (var o in t) n.push(o);
          return (
            n.reverse(),
            function e() {
              for (; n.length; ) {
                var o = n.pop();
                if (o in t) return (e.value = o), (e.done = !1), e;
              }
              return (e.done = !0), e;
            }
          );
        }),
        (t.values = A),
        (q.prototype = {
          constructor: q,
          reset: function (t) {
            if (
              ((this.prev = 0),
              (this.next = 0),
              (this.sent = this._sent = e),
              (this.done = !1),
              (this.delegate = null),
              (this.method = "next"),
              (this.arg = e),
              this.tryEntries.forEach(j),
              !t)
            )
              for (var n in this)
                "t" === n.charAt(0) &&
                  o.call(this, n) &&
                  !isNaN(+n.slice(1)) &&
                  (this[n] = e);
          },
          stop: function () {
            this.done = !0;
            var e = this.tryEntries[0].completion;
            if ("throw" === e.type) throw e.arg;
            return this.rval;
          },
          dispatchException: function (t) {
            if (this.done) throw t;
            var n = this;
            function r(o, r) {
              return (
                (a.type = "throw"),
                (a.arg = t),
                (n.next = o),
                r && ((n.method = "next"), (n.arg = e)),
                !!r
              );
            }
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
              var s = this.tryEntries[i],
                a = s.completion;
              if ("root" === s.tryLoc) return r("end");
              if (s.tryLoc <= this.prev) {
                var c = o.call(s, "catchLoc"),
                  u = o.call(s, "finallyLoc");
                if (c && u) {
                  if (this.prev < s.catchLoc) return r(s.catchLoc, !0);
                  if (this.prev < s.finallyLoc) return r(s.finallyLoc);
                } else if (c) {
                  if (this.prev < s.catchLoc) return r(s.catchLoc, !0);
                } else {
                  if (!u)
                    throw new Error("try statement without catch or finally");
                  if (this.prev < s.finallyLoc) return r(s.finallyLoc);
                }
              }
            }
          },
          abrupt: function (e, t) {
            for (var n = this.tryEntries.length - 1; n >= 0; --n) {
              var r = this.tryEntries[n];
              if (
                r.tryLoc <= this.prev &&
                o.call(r, "finallyLoc") &&
                this.prev < r.finallyLoc
              ) {
                var i = r;
                break;
              }
            }
            i &&
              ("break" === e || "continue" === e) &&
              i.tryLoc <= t &&
              t <= i.finallyLoc &&
              (i = null);
            var s = i ? i.completion : {};
            return (
              (s.type = e),
              (s.arg = t),
              i
                ? ((this.method = "next"), (this.next = i.finallyLoc), m)
                : this.complete(s)
            );
          },
          complete: function (e, t) {
            if ("throw" === e.type) throw e.arg;
            return (
              "break" === e.type || "continue" === e.type
                ? (this.next = e.arg)
                : "return" === e.type
                ? ((this.rval = this.arg = e.arg),
                  (this.method = "return"),
                  (this.next = "end"))
                : "normal" === e.type && t && (this.next = t),
              m
            );
          },
          finish: function (e) {
            for (var t = this.tryEntries.length - 1; t >= 0; --t) {
              var n = this.tryEntries[t];
              if (n.finallyLoc === e)
                return this.complete(n.completion, n.afterLoc), j(n), m;
            }
          },
          catch: function (e) {
            for (var t = this.tryEntries.length - 1; t >= 0; --t) {
              var n = this.tryEntries[t];
              if (n.tryLoc === e) {
                var o = n.completion;
                if ("throw" === o.type) {
                  var r = o.arg;
                  j(n);
                }
                return r;
              }
            }
            throw new Error("illegal catch attempt");
          },
          delegateYield: function (t, n, o) {
            return (
              (this.delegate = { iterator: A(t), resultName: n, nextLoc: o }),
              "next" === this.method && (this.arg = e),
              m
            );
          },
        }),
        t
      );
    }
    function pe(e, t, n, o, r, i, s) {
      try {
        var a = e[i](s),
          c = a.value;
      } catch (e) {
        return void n(e);
      }
      a.done ? t(c) : Promise.resolve(c).then(o, r);
    }
    function he(e) {
      return function () {
        var t = this,
          n = arguments;
        return new Promise(function (o, r) {
          var i = e.apply(t, n);
          function s(e) {
            pe(i, o, r, s, a, "next", e);
          }
          function a(e) {
            pe(i, o, r, s, a, "throw", e);
          }
          s(void 0);
        });
      };
    }
    function ge(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var n = 0, o = new Array(t); n < t; n++) o[n] = e[n];
      return o;
    }
    function me(e, t) {
      for (var n = 0; n < t.length; n++) {
        var o = t[n];
        (o.enumerable = o.enumerable || !1),
          (o.configurable = !0),
          "value" in o && (o.writable = !0),
          Object.defineProperty(e, ye(o.key), o);
      }
    }
    function ve(e, t, n) {
      return (
        (t = ye(t)) in e
          ? Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = n),
        e
      );
    }
    function ye(e) {
      var t = (function (e, t) {
        if ("object" !== de(e) || null === e) return e;
        var n = e[Symbol.toPrimitive];
        if (void 0 !== n) {
          var o = n.call(e, "string");
          if ("object" !== de(o)) return o;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return String(e);
      })(e);
      return "symbol" === de(t) ? t : String(t);
    }
    ue({});
    var be = (function () {
      function e() {
        var t = this;
        !(function (e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        })(this, e),
          ve(this, "questions", void 0),
          ve(this, "viewableQuestions", []),
          ve(this, "currentPage", void 0),
          ve(this, "itemsPerPage", 5),
          ve(this, "searchText", void 0),
          ve(this, "numOfTotalPages", void 0),
          (this.searchText = ue("")),
          (this.currentPage = ue(0)),
          (this.questions = ue([])),
          (this.viewableQuestions = this.getviewableQuestions()),
          (this.numOfTotalPages = le(this.questions, function (e) {
            return Math.ceil(e.length / t.itemsPerPage);
          }));
      }
      var t, n, o, r;
      return (
        (t = e),
        (n = [
          {
            key: "updateCurrentPage",
            value: function (e) {
              this.currentPage.set(e);
            },
          },
          {
            key: "getviewableQuestionsTest",
            value: function () {
              return le(this.questions, function (e) {
                return e.slice(0, 2);
              });
            },
          },
          {
            key: "setSearchText",
            value: function (e) {
              this.searchText.set(e);
            },
          },
          {
            key: "onPaginationChange",
            value: function (e) {
              var t,
                n = d(this.currentPage),
                o = d(this.numOfTotalPages);
              switch (e) {
                case "previous":
                  t = n - 1;
                  break;
                case "next":
                  t = n + 1;
                  break;
                case "first":
                  t = 0;
                  break;
                case "last":
                  t = o - 1;
                  break;
                default:
                  (t = e.split("-")[1]), (t = parseInt(t));
              }
              0 > t || t > o - 1 || this.updateCurrentPage(t);
            },
          },
          {
            key: "getviewableQuestions",
            value: function () {
              var e = this;
              return le(
                [this.questions, this.searchText, this.currentPage],
                function (t) {
                  var n = (function (e, t) {
                      return (
                        (function (e) {
                          if (Array.isArray(e)) return e;
                        })(e) ||
                        (function (e, t) {
                          var n =
                            null == e
                              ? null
                              : ("undefined" != typeof Symbol &&
                                  e[Symbol.iterator]) ||
                                e["@@iterator"];
                          if (null != n) {
                            var o,
                              r,
                              i,
                              s,
                              a = [],
                              c = !0,
                              u = !1;
                            try {
                              if (((i = (n = n.call(e)).next), 0 === t)) {
                                if (Object(n) !== n) return;
                                c = !1;
                              } else
                                for (
                                  ;
                                  !(c = (o = i.call(n)).done) &&
                                  (a.push(o.value), a.length !== t);
                                  c = !0
                                );
                            } catch (e) {
                              (u = !0), (r = e);
                            } finally {
                              try {
                                if (
                                  !c &&
                                  null != n.return &&
                                  ((s = n.return()), Object(s) !== s)
                                )
                                  return;
                              } finally {
                                if (u) throw r;
                              }
                            }
                            return a;
                          }
                        })(e, t) ||
                        (function (e, t) {
                          if (e) {
                            if ("string" == typeof e) return ge(e, t);
                            var n = Object.prototype.toString
                              .call(e)
                              .slice(8, -1);
                            return (
                              "Object" === n &&
                                e.constructor &&
                                (n = e.constructor.name),
                              "Map" === n || "Set" === n
                                ? Array.from(e)
                                : "Arguments" === n ||
                                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(
                                    n
                                  )
                                ? ge(e, t)
                                : void 0
                            );
                          }
                        })(e, t) ||
                        (function () {
                          throw new TypeError(
                            "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
                          );
                        })()
                      );
                    })(t, 3),
                    o = n[0],
                    r = n[1],
                    i = n[2];
                  return o
                    .filter(function (t) {
                      return "" == r || e.checkMatch(t, r);
                    })
                    .slice(i * e.itemsPerPage, (i + 1) * e.itemsPerPage);
                }
              );
            },
          },
          {
            key: "setQuestions",
            value: function (e) {
              this.questions.set(e);
            },
          },
          {
            key: "postVote",
            value: function (e) {
              jQuery.post(helpie_faq_object.ajax_url, e, function (e) {
                JSON.parse(e);
              });
            },
          },
          {
            key: "postItem",
            value:
              ((r = he(
                fe().mark(function e(t) {
                  var n, o, r;
                  return fe().wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            return (
                              (o = this),
                              ((r = t).action = "helpie_qna_submission"),
                              (e.next = 7),
                              jQuery.post(helpie_faq_object.ajax_url, r)
                            );
                          case 7:
                            return (n = e.sent), (e.next = 10), o.getPosts(t);
                          case 10:
                            return e.abrupt("return", n);
                          case 11:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    this
                  );
                })
              )),
              function (e) {
                return r.apply(this, arguments);
              }),
          },
          {
            key: "checkMatch",
            value: function (e, t) {
              var n = !1;
              if ((n = e.content.toLowerCase().includes(t.toLowerCase())))
                return n;
              for (
                var o = 0;
                o < e.answers.length &&
                !(n = e.answers[o].content
                  .toLowerCase()
                  .includes(t.toLowerCase()));
                ++o
              );
              return n;
            },
          },
          {
            key: "getPosts",
            value:
              ((o = he(
                fe().mark(function e(t) {
                  var n, o;
                  return fe().wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            return (
                              (n = []),
                              ((o = t).action = "helpie_qna_get_posts"),
                              (e.next = 5),
                              jQuery.get(
                                helpie_faq_object.ajax_url,
                                o,
                                function (e) {
                                  JSON.parse(e).forEach(function (e) {
                                    var t = {
                                      content: e.post_title,
                                      id: e.ID,
                                      answers: [],
                                      votes: e.votes,
                                      url: e.guid,
                                      currentUserVotes: e.current_user_votes,
                                      userHasAlreadyAnswered:
                                        e.user_has_already_answered,
                                    };
                                    e.answers.forEach(function (e) {
                                      t.answers.push({
                                        content: e.comment_content,
                                        answer_by: e.comment_author,
                                        created_date: e.comment_date,
                                        comment_ID: e.comment_ID,
                                        votes: e.votes,
                                        human_time_diff: e.human_time_diff,
                                      });
                                    }),
                                      (n[n.length] = t);
                                  });
                                }
                              )
                            );
                          case 5:
                            return this.setQuestions(n), e.abrupt("return", n);
                          case 7:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    this
                  );
                })
              )),
              function (e) {
                return o.apply(this, arguments);
              }),
          },
        ]),
        n && me(t.prototype, n),
        Object.defineProperty(t, "prototype", { writable: !1 }),
        e
      );
    })();
    const we = new be(),
      xe = "assets/js/svelte/qna/listItem.svelte";
    function _e(e) {
      let n, o;
      const r = {
        c: function () {
          (n = b("span")),
            oe(n, "class", (o = "dashicons dashicons-" + e[2])),
            t(n, xe, 12, 3, 328);
        },
        m: function (e, t) {
          ee(e, n, t);
        },
        p: function (e, t) {
          4 & t &&
            o !== (o = "dashicons dashicons-" + e[2]) &&
            oe(n, "class", o);
        },
        d: function (e) {
          e && te(n);
        },
      };
      return (
        K("SvelteRegisterBlock", {
          block: r,
          id: _e.name,
          type: "if",
          source: '(12:2) {#if id == \\"previous\\" && icon}',
          ctx: e,
        }),
        r
      );
    }
    function ke(e) {
      let n, o;
      const r = {
        c: function () {
          (n = b("span")),
            oe(n, "class", (o = "dashicons dashicons-" + e[2])),
            t(n, xe, 16, 3, 422);
        },
        m: function (e, t) {
          ee(e, n, t);
        },
        p: function (e, t) {
          4 & t &&
            o !== (o = "dashicons dashicons-" + e[2]) &&
            oe(n, "class", o);
        },
        d: function (e) {
          e && te(n);
        },
      };
      return (
        K("SvelteRegisterBlock", {
          block: r,
          id: ke.name,
          type: "if",
          source: '(16:2) {#if id == \\"next\\" && icon}',
          ctx: e,
        }),
        r
      );
    }
    function Se(n) {
      let o,
        r,
        i,
        s,
        a,
        c,
        u,
        l,
        d = "previous" == n[0] && n[2] && _e(n),
        f = "next" == n[0] && n[2] && ke(n);
      const p = {
        c: function () {
          (o = b("li")),
            (r = b("a")),
            d && d.c(),
            (i = x()),
            (s = w(n[1])),
            (a = x()),
            f && f.c(),
            oe(r, "disabled", n[4]),
            S(r, "active", n[3]),
            t(r, xe, 10, 1, 225),
            oe(
              o,
              "class",
              (c = "tablesome-pagination__" + n[0] + " pagination-" + n[0])
            ),
            t(o, xe, 9, 0, 168);
        },
        l: function (e) {
          throw new Error(
            "options.hydrate only works if the component was compiled with the `hydratable: true` option"
          );
        },
        m: function (e, t) {
          ee(e, o, t),
            Z(o, r),
            d && d.m(r, null),
            Z(r, i),
            Z(r, s),
            Z(r, a),
            f && f.m(r, null),
            u || ((l = ne(r, "click", n[6], !1, !1, !1, !1)), (u = !0));
        },
        p: function (e, [t]) {
          "previous" == e[0] && e[2]
            ? d
              ? d.p(e, t)
              : ((d = _e(e)), d.c(), d.m(r, i))
            : d && (d.d(1), (d = null)),
            2 & t && re(s, e[1]),
            "next" == e[0] && e[2]
              ? f
                ? f.p(e, t)
                : ((f = ke(e)), f.c(), f.m(r, null))
              : f && (f.d(1), (f = null)),
            16 & t && oe(r, "disabled", e[4]),
            8 & t && S(r, "active", e[3]),
            1 & t &&
              c !==
                (c = "tablesome-pagination__" + e[0] + " pagination-" + e[0]) &&
              oe(o, "class", c);
        },
        i: e,
        o: e,
        d: function (e) {
          e && te(o), d && d.d(), f && f.d(), (u = !1), l();
        },
      };
      return (
        K("SvelteRegisterBlock", {
          block: p,
          id: Se.name,
          type: "component",
          source: "",
          ctx: n,
        }),
        p
      );
    }
    function $e(e, t, n) {
      let { $$slots: o = {}, $$scope: r } = t;
      se(0, o, []);
      let { id: i } = t,
        { label: s = "" } = t,
        { icon: a = "" } = t,
        { active: c = !1 } = t,
        { readOnly: u = !1 } = t,
        { callback: l = "" } = t;
      e.$$.on_mount.push(function () {
        void 0 === i && !("id" in t) && e.$$.bound[e.$$.props.id];
      });
      const d = ["id", "label", "icon", "active", "readOnly", "callback"];
      return (
        Object.keys(t).forEach((e) => {
          !~d.indexOf(e) && e.slice(0, 2);
        }),
        (e.$$set = (e) => {
          "id" in e && n(0, (i = e.id)),
            "label" in e && n(1, (s = e.label)),
            "icon" in e && n(2, (a = e.icon)),
            "active" in e && n(3, (c = e.active)),
            "readOnly" in e && n(4, (u = e.readOnly)),
            "callback" in e && n(5, (l = e.callback));
        }),
        (e.$capture_state = () => ({
          id: i,
          label: s,
          icon: a,
          active: c,
          readOnly: u,
          callback: l,
        })),
        (e.$inject_state = (e) => {
          "id" in e && n(0, (i = e.id)),
            "label" in e && n(1, (s = e.label)),
            "icon" in e && n(2, (a = e.icon)),
            "active" in e && n(3, (c = e.active)),
            "readOnly" in e && n(4, (u = e.readOnly)),
            "callback" in e && n(5, (l = e.callback));
        }),
        t && "$$inject" in t && e.$inject_state(t.$$inject),
        [i, s, a, c, u, l, () => l(i)]
      );
    }
    const Ee = class extends ae {
        constructor(e) {
          super(e),
            G(this, e, $e, Se, a, {
              id: 0,
              label: 1,
              icon: 2,
              active: 3,
              readOnly: 4,
              callback: 5,
            }),
            K("SvelteRegisterComponent", {
              component: this,
              tagName: "ListItem",
              options: e,
              id: Se.name,
            });
        }
        get id() {
          throw new Error(
            "<ListItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
          );
        }
        set id(e) {
          throw new Error(
            "<ListItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
          );
        }
        get label() {
          throw new Error(
            "<ListItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
          );
        }
        set label(e) {
          throw new Error(
            "<ListItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
          );
        }
        get icon() {
          throw new Error(
            "<ListItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
          );
        }
        set icon(e) {
          throw new Error(
            "<ListItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
          );
        }
        get active() {
          throw new Error(
            "<ListItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
          );
        }
        set active(e) {
          throw new Error(
            "<ListItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
          );
        }
        get readOnly() {
          throw new Error(
            "<ListItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
          );
        }
        set readOnly(e) {
          throw new Error(
            "<ListItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
          );
        }
        get callback() {
          throw new Error(
            "<ListItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
          );
        }
        set callback(e) {
          throw new Error(
            "<ListItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
          );
        }
      },
      { console: Te, window: Ce } = f,
      je = "assets/js/svelte/qna/pagination.svelte";
    function qe(e, t, n) {
      const o = e.slice();
      return (o[16] = t[n]), o;
    }
    function Ae(e) {
      let n,
        o,
        r,
        i,
        s,
        a,
        c,
        u = e[7](e[0]),
        l = e[8](e[0]),
        d = e[9](e[0]),
        f = e[8](e[0]),
        p = e[7](e[0]),
        h = u && Pe(e),
        g = l && Ie(e),
        m = d && Ne(e),
        v = f && Me(e),
        y = p && Re(e);
      const w = {
        c: function () {
          (n = b("nav")),
            (o = b("ul")),
            h && h.c(),
            (r = x()),
            g && g.c(),
            (i = x()),
            m && m.c(),
            (s = x()),
            v && v.c(),
            (a = x()),
            y && y.c(),
            t(o, je, 147, 2, 3075),
            oe(n, "role", "pagination"),
            oe(n, "class", "helpiefaq__qna-pagination pagination"),
            t(n, je, 146, 1, 3004);
        },
        m: function (e, t) {
          ee(e, n, t),
            Z(n, o),
            h && h.m(o, null),
            Z(o, r),
            g && g.m(o, null),
            Z(o, i),
            m && m.m(o, null),
            Z(o, s),
            v && v.m(o, null),
            Z(o, a),
            y && y.m(o, null),
            (c = !0);
        },
        p: function (e, t) {
          1 & t && (u = e[7](e[0])),
            u
              ? h
                ? (h.p(e, t), 1 & t && V(h, 1))
                : ((h = Pe(e)), h.c(), V(h, 1), h.m(o, r))
              : h &&
                (B(),
                U(h, 1, 1, () => {
                  h = null;
                }),
                W()),
            1 & t && (l = e[8](e[0])),
            l
              ? g
                ? (g.p(e, t), 1 & t && V(g, 1))
                : ((g = Ie(e)), g.c(), V(g, 1), g.m(o, i))
              : g &&
                (B(),
                U(g, 1, 1, () => {
                  g = null;
                }),
                W()),
            1 & t && (d = e[9](e[0])),
            d
              ? m
                ? (m.p(e, t), 1 & t && V(m, 1))
                : ((m = Ne(e)), m.c(), V(m, 1), m.m(o, s))
              : m &&
                (B(),
                U(m, 1, 1, () => {
                  m = null;
                }),
                W()),
            1 & t && (f = e[8](e[0])),
            f
              ? v
                ? (v.p(e, t), 1 & t && V(v, 1))
                : ((v = Me(e)), v.c(), V(v, 1), v.m(o, a))
              : v &&
                (B(),
                U(v, 1, 1, () => {
                  v = null;
                }),
                W()),
            1 & t && (p = e[7](e[0])),
            p
              ? y
                ? (y.p(e, t), 1 & t && V(y, 1))
                : ((y = Re(e)), y.c(), V(y, 1), y.m(o, null))
              : y &&
                (B(),
                U(y, 1, 1, () => {
                  y = null;
                }),
                W());
        },
        i: function (e) {
          c || (V(h), V(g), V(m), V(v), V(y), (c = !0));
        },
        o: function (e) {
          U(h), U(g), U(m), U(v), U(y), (c = !1);
        },
        d: function (e) {
          e && te(n),
            h && h.d(),
            g && g.d(),
            m && m.d(),
            v && v.d(),
            y && y.d();
        },
      };
      return (
        K("SvelteRegisterBlock", {
          block: w,
          id: Ae.name,
          type: "if",
          source: "(146:0) {#if 1 < numOfTotalPages}",
          ctx: e,
        }),
        w
      );
    }
    function Pe(e) {
      let t, n;
      t = new Ee({
        props: {
          id: "first",
          label: e[4].first,
          readOnly: 0 === e[1],
          callback: e[5],
        },
        $$inline: !0,
      });
      const o = {
        c: function () {
          z(t.$$.fragment);
        },
        m: function (e, o) {
          J(t, e, o), (n = !0);
        },
        p: function (e, n) {
          const o = {};
          2 & n && (o.readOnly = 0 === e[1]), t.$set(o);
        },
        i: function (e) {
          n || (V(t.$$.fragment, e), (n = !0));
        },
        o: function (e) {
          U(t.$$.fragment, e), (n = !1);
        },
        d: function (e) {
          X(t, e);
        },
      };
      return (
        K("SvelteRegisterBlock", {
          block: o,
          id: Pe.name,
          type: "if",
          source: "(149:3) {#if showFirstAndLastButtons(innerWidth)}",
          ctx: e,
        }),
        o
      );
    }
    function Ie(e) {
      let t, n;
      t = new Ee({
        props: {
          id: "previous",
          label: e[4].previous,
          icon: e[6](e[0]) ? "arrow-left-alt2" : "",
          readOnly: 0 === e[1],
          callback: e[5],
        },
        $$inline: !0,
      });
      const o = {
        c: function () {
          z(t.$$.fragment);
        },
        m: function (e, o) {
          J(t, e, o), (n = !0);
        },
        p: function (e, n) {
          const o = {};
          1 & n && (o.icon = e[6](e[0]) ? "arrow-left-alt2" : ""),
            2 & n && (o.readOnly = 0 === e[1]),
            t.$set(o);
        },
        i: function (e) {
          n || (V(t.$$.fragment, e), (n = !0));
        },
        o: function (e) {
          U(t.$$.fragment, e), (n = !1);
        },
        d: function (e) {
          X(t, e);
        },
      };
      return (
        K("SvelteRegisterBlock", {
          block: o,
          id: Ie.name,
          type: "if",
          source: "(158:3) {#if showPreviousAndNextButtons(innerWidth)}",
          ctx: e,
        }),
        o
      );
    }
    function Ne(e) {
      let t,
        n,
        o = e[3];
      ie(o);
      let r = [];
      for (let t = 0; t < o.length; t += 1) r[t] = Le(qe(e, o, t));
      const i = (e) =>
          U(r[e], 1, 1, () => {
            r[e] = null;
          }),
        s = {
          c: function () {
            for (let e = 0; e < r.length; e += 1) r[e].c();
            t = _();
          },
          m: function (e, o) {
            for (let t = 0; t < r.length; t += 1) r[t] && r[t].m(e, o);
            ee(e, t, o), (n = !0);
          },
          p: function (e, n) {
            if (46 & n) {
              let s;
              for (o = e[3], ie(o), s = 0; s < o.length; s += 1) {
                const i = qe(e, o, s);
                r[s]
                  ? (r[s].p(i, n), V(r[s], 1))
                  : ((r[s] = Le(i)),
                    r[s].c(),
                    V(r[s], 1),
                    r[s].m(t.parentNode, t));
              }
              for (B(), s = o.length; s < r.length; s += 1) i(s);
              W();
            }
          },
          i: function (e) {
            if (!n) {
              for (let e = 0; e < o.length; e += 1) V(r[e]);
              n = !0;
            }
          },
          o: function (e) {
            r = r.filter(Boolean);
            for (let e = 0; e < r.length; e += 1) U(r[e]);
            n = !1;
          },
          d: function (e) {
            y(r, e), e && te(t);
          },
        };
      return (
        K("SvelteRegisterBlock", {
          block: s,
          id: Ne.name,
          type: "if",
          source: "(168:3) {#if showNumberButtons(innerWidth)}",
          ctx: e,
        }),
        s
      );
    }
    function Oe(e) {
      let t, n;
      t = new Ee({
        props: {
          id: "page-" + (e[1] + e[16]),
          label: e[1] + e[16] + 1,
          active: e[1] === e[1] + e[16],
          callback: e[5],
        },
        $$inline: !0,
      });
      const o = {
        c: function () {
          z(t.$$.fragment);
        },
        m: function (e, o) {
          J(t, e, o), (n = !0);
        },
        p: function (e, n) {
          const o = {};
          2 & n && (o.id = "page-" + (e[1] + e[16])),
            2 & n && (o.label = e[1] + e[16] + 1),
            2 & n && (o.active = e[1] === e[1] + e[16]),
            t.$set(o);
        },
        i: function (e) {
          n || (V(t.$$.fragment, e), (n = !0));
        },
        o: function (e) {
          U(t.$$.fragment, e), (n = !1);
        },
        d: function (e) {
          X(t, e);
        },
      };
      return (
        K("SvelteRegisterBlock", {
          block: o,
          id: Oe.name,
          type: "if",
          source:
            "(170:5) {#if currentPage + button >= 0 && currentPage + button < numOfTotalPages}",
          ctx: e,
        }),
        o
      );
    }
    function Le(e) {
      let t,
        n,
        o = e[1] + e[16] >= 0 && e[1] + e[16] < e[2] && Oe(e);
      const r = {
        c: function () {
          o && o.c(), (t = _());
        },
        m: function (e, r) {
          o && o.m(e, r), ee(e, t, r), (n = !0);
        },
        p: function (e, n) {
          e[1] + e[16] >= 0 && e[1] + e[16] < e[2]
            ? o
              ? (o.p(e, n), 6 & n && V(o, 1))
              : ((o = Oe(e)), o.c(), V(o, 1), o.m(t.parentNode, t))
            : o &&
              (B(),
              U(o, 1, 1, () => {
                o = null;
              }),
              W());
        },
        i: function (e) {
          n || (V(o), (n = !0));
        },
        o: function (e) {
          U(o), (n = !1);
        },
        d: function (e) {
          o && o.d(e), e && te(t);
        },
      };
      return (
        K("SvelteRegisterBlock", {
          block: r,
          id: Le.name,
          type: "each",
          source: "(169:4) {#each buttons as button}",
          ctx: e,
        }),
        r
      );
    }
    function Me(e) {
      let t, n;
      t = new Ee({
        props: {
          id: "next",
          label: e[4].next,
          icon: e[6](e[0]) ? "arrow-right-alt2" : "",
          readOnly: e[1] > e[2] - 1,
          callback: e[5],
        },
        $$inline: !0,
      });
      const o = {
        c: function () {
          z(t.$$.fragment);
        },
        m: function (e, o) {
          J(t, e, o), (n = !0);
        },
        p: function (e, n) {
          const o = {};
          1 & n && (o.icon = e[6](e[0]) ? "arrow-right-alt2" : ""),
            6 & n && (o.readOnly = e[1] > e[2] - 1),
            t.$set(o);
        },
        i: function (e) {
          n || (V(t.$$.fragment, e), (n = !0));
        },
        o: function (e) {
          U(t.$$.fragment, e), (n = !1);
        },
        d: function (e) {
          X(t, e);
        },
      };
      return (
        K("SvelteRegisterBlock", {
          block: o,
          id: Me.name,
          type: "if",
          source: "(181:3) {#if showPreviousAndNextButtons(innerWidth)}",
          ctx: e,
        }),
        o
      );
    }
    function Re(e) {
      let t, n;
      t = new Ee({
        props: {
          id: "last",
          label: e[4].last,
          readOnly: e[1] >= e[2],
          callback: e[5],
        },
        $$inline: !0,
      });
      const o = {
        c: function () {
          z(t.$$.fragment);
        },
        m: function (e, o) {
          J(t, e, o), (n = !0);
        },
        p: function (e, n) {
          const o = {};
          6 & n && (o.readOnly = e[1] >= e[2]), t.$set(o);
        },
        i: function (e) {
          n || (V(t.$$.fragment, e), (n = !0));
        },
        o: function (e) {
          U(t.$$.fragment, e), (n = !1);
        },
        d: function (e) {
          X(t, e);
        },
      };
      return (
        K("SvelteRegisterBlock", {
          block: o,
          id: Re.name,
          type: "if",
          source: "(190:3) {#if showFirstAndLastButtons(innerWidth)}",
          ctx: e,
        }),
        o
      );
    }
    function De(e) {
      let t, n, o, r;
      O(e[12]);
      let i = 1 < e[2] && Ae(e);
      const s = {
        c: function () {
          i && i.c(), (t = _());
        },
        l: function (e) {
          throw new Error(
            "options.hydrate only works if the component was compiled with the `hydratable: true` option"
          );
        },
        m: function (s, a) {
          i && i.m(s, a),
            ee(s, t, a),
            (n = !0),
            o || ((r = ne(Ce, "resize", e[12])), (o = !0));
        },
        p: function (e, [n]) {
          1 < e[2]
            ? i
              ? (i.p(e, n), 4 & n && V(i, 1))
              : ((i = Ae(e)), i.c(), V(i, 1), i.m(t.parentNode, t))
            : i &&
              (B(),
              U(i, 1, 1, () => {
                i = null;
              }),
              W());
        },
        i: function (e) {
          n || (V(i), (n = !0));
        },
        o: function (e) {
          U(i), (n = !1);
        },
        d: function (e) {
          i && i.d(e), e && te(t), (o = !1), r();
        },
      };
      return (
        K("SvelteRegisterBlock", {
          block: s,
          id: De.name,
          type: "component",
          source: "",
          ctx: e,
        }),
        s
      );
    }
    function He(e, t, n) {
      let { $$slots: o = {}, $$scope: r } = t;
      se(0, o, []);
      let { options: i } = t,
        { store: s } = t,
        a = {
          pagination_show_previous_and_next_buttons: !0,
          pagination_show_first_and_last_buttons: !0,
        },
        c = "frontend",
        u = window.innerWidth,
        l = [-2, -1, 0, 1, 2],
        f = {
          first: "first",
          last: "last",
          next: "next",
          previous: "previous",
        };
      const p = (e) => {
          s.onPaginationChange(e);
        },
        h = (e) => e <= 640,
        g = (e) => {
          let t = a.pagination_show_first_and_last_buttons;
          return "editor" == c && (t = !0), h(e) && (t = !1), t;
        },
        m = (e) => {
          let t = !0;
          return (
            (t = a.pagination_show_previous_and_next_buttons),
            "editor" == c && (t = !0),
            t
          );
        },
        v = (e) => {
          let t = !0;
          return (
            h(e) && (t = !a.pagination_show_previous_and_next_buttons),
            "editor" == c && (t = !0),
            t
          );
        };
      let y;
      const b = s.currentPage.subscribe((e) => {
        n(1, (y = e));
      });
      let w;
      s.numOfTotalPages.subscribe((e) => {
        n(2, (w = e));
      }),
        e.$$.on_mount.push(function () {
          void 0 !== i ||
            "options" in t ||
            e.$$.bound[e.$$.props.options] ||
            Te.warn("<Pagination> was created without expected prop 'options'"),
            void 0 !== s ||
              "store" in t ||
              e.$$.bound[e.$$.props.store] ||
              Te.warn("<Pagination> was created without expected prop 'store'");
        });
      const x = ["options", "store"];
      return (
        Object.keys(t).forEach((e) => {
          ~x.indexOf(e) ||
            "$$" === e.slice(0, 2) ||
            "slot" === e ||
            Te.warn(`<Pagination> was created with unknown prop '${e}'`);
        }),
        (e.$$set = (e) => {
          "options" in e && n(10, (i = e.options)),
            "store" in e && n(11, (s = e.store));
        }),
        (e.$capture_state = () => ({
          get: d,
          ListItem: Ee,
          options: i,
          store: s,
          display: a,
          mode: c,
          innerWidth: u,
          buttons: l,
          labels: f,
          onChange: p,
          isMobileScreen: h,
          showFirstAndLastButtons: g,
          showPreviousAndNextButtons: m,
          showNumberButtons: v,
          currentPage: y,
          unsubscribe1: b,
          numOfTotalPages: w,
        })),
        (e.$inject_state = (e) => {
          "options" in e && n(10, (i = e.options)),
            "store" in e && n(11, (s = e.store)),
            "display" in e && (a = e.display),
            "mode" in e && (c = e.mode),
            "innerWidth" in e && n(0, (u = e.innerWidth)),
            "buttons" in e && n(3, (l = e.buttons)),
            "labels" in e && n(4, (f = e.labels)),
            "currentPage" in e && n(1, (y = e.currentPage)),
            "numOfTotalPages" in e && n(2, (w = e.numOfTotalPages));
        }),
        t && "$$inject" in t && e.$inject_state(t.$$inject),
        [
          u,
          y,
          w,
          l,
          f,
          p,
          h,
          g,
          m,
          v,
          i,
          s,
          function () {
            n(0, (u = Ce.innerWidth));
          },
        ]
      );
    }
    const Fe = class extends ae {
        constructor(e) {
          super(e),
            G(this, e, He, De, a, { options: 10, store: 11 }),
            K("SvelteRegisterComponent", {
              component: this,
              tagName: "Pagination",
              options: e,
              id: De.name,
            });
        }
        get options() {
          throw new Error(
            "<Pagination>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
          );
        }
        set options(e) {
          throw new Error(
            "<Pagination>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
          );
        }
        get store() {
          throw new Error(
            "<Pagination>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
          );
        }
        set store(e) {
          throw new Error(
            "<Pagination>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
          );
        }
      },
      Qe = "assets/js/svelte/qna/showMore.svelte";
    function Be(e) {
      let n, o, r, i, s, a, c, u, l;
      const d = {
        c: function () {
          (n = b("div")),
            (o = b("div")),
            (o.textContent = " "),
            (r = x()),
            (i = b("div")),
            (s = b("div")),
            (a = b("a")),
            (c = w(e[3])),
            oe(o, "class", "col col__2"),
            t(o, Qe, 10, 2, 189),
            oe(a, "class", "svelte-dofab0"),
            t(a, Qe, 13, 4, 284),
            oe(s, "class", "showMore svelte-dofab0"),
            t(s, Qe, 12, 3, 257),
            oe(i, "class", "col col__10"),
            t(i, Qe, 11, 2, 228),
            oe(n, "class", "row"),
            t(n, Qe, 9, 1, 169);
        },
        m: function (t, d) {
          ee(t, n, d),
            Z(n, o),
            Z(n, r),
            Z(n, i),
            Z(i, s),
            Z(s, a),
            Z(a, c),
            u || ((l = ne(a, "click", e[4], !1, !1, !1, !1)), (u = !0));
        },
        p: function (e, t) {
          8 & t && re(c, e[3]);
        },
        d: function (e) {
          e && te(n), (u = !1), l();
        },
      };
      return (
        K("SvelteRegisterBlock", {
          block: d,
          id: Be.name,
          type: "if",
          source: "(9:0) {#if ii == 0}",
          ctx: e,
        }),
        d
      );
    }
    function We(t) {
      let n,
        o = 0 == t[1] && Be(t);
      const r = {
        c: function () {
          o && o.c(), (n = _());
        },
        l: function (e) {
          throw new Error(
            "options.hydrate only works if the component was compiled with the `hydratable: true` option"
          );
        },
        m: function (e, t) {
          o && o.m(e, t), ee(e, n, t);
        },
        p: function (e, [t]) {
          0 == e[1]
            ? o
              ? o.p(e, t)
              : ((o = Be(e)), o.c(), o.m(n.parentNode, n))
            : o && (o.d(1), (o = null));
        },
        i: e,
        o: e,
        d: function (e) {
          o && o.d(e), e && te(n);
        },
      };
      return (
        K("SvelteRegisterBlock", {
          block: r,
          id: We.name,
          type: "component",
          source: "",
          ctx: t,
        }),
        r
      );
    }
    function Ve(e, t, n) {
      let o,
        { $$slots: r = {}, $$scope: i } = t;
      se(0, r, []);
      let { showMore: s } = t,
        { ii: a } = t,
        { toggleShow: c } = t;
      e.$$.on_mount.push(function () {
        void 0 === s && !("showMore" in t) && e.$$.bound[e.$$.props.showMore],
          void 0 === a && !("ii" in t) && e.$$.bound[e.$$.props.ii],
          void 0 === c &&
            !("toggleShow" in t) &&
            e.$$.bound[e.$$.props.toggleShow];
      });
      const u = ["showMore", "ii", "toggleShow"];
      return (
        Object.keys(t).forEach((e) => {
          !~u.indexOf(e) && e.slice(0, 2);
        }),
        (e.$$set = (e) => {
          "showMore" in e && n(0, (s = e.showMore)),
            "ii" in e && n(1, (a = e.ii)),
            "toggleShow" in e && n(2, (c = e.toggleShow));
        }),
        (e.$capture_state = () => ({
          showMore: s,
          ii: a,
          toggleShow: c,
          showMoreText: o,
        })),
        (e.$inject_state = (e) => {
          "showMore" in e && n(0, (s = e.showMore)),
            "ii" in e && n(1, (a = e.ii)),
            "toggleShow" in e && n(2, (c = e.toggleShow)),
            "showMoreText" in e && n(3, (o = e.showMoreText));
        }),
        t && "$$inject" in t && e.$inject_state(t.$$inject),
        (e.$$.update = () => {
          1 & e.$$.dirty &&
            n(3, (o = s ? "See Less Answers" : "See More Answers"));
        }),
        [s, a, c, o, () => c(!s)]
      );
    }
    const Ue = class extends ae {
        constructor(e) {
          super(e),
            G(this, e, Ve, We, a, { showMore: 0, ii: 1, toggleShow: 2 }),
            K("SvelteRegisterComponent", {
              component: this,
              tagName: "ShowMore",
              options: e,
              id: We.name,
            });
        }
        get showMore() {
          throw new Error(
            "<ShowMore>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
          );
        }
        set showMore(e) {
          throw new Error(
            "<ShowMore>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
          );
        }
        get ii() {
          throw new Error(
            "<ShowMore>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
          );
        }
        set ii(e) {
          throw new Error(
            "<ShowMore>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
          );
        }
        get toggleShow() {
          throw new Error(
            "<ShowMore>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
          );
        }
        set toggleShow(e) {
          throw new Error(
            "<ShowMore>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
          );
        }
      },
      ze = "assets/js/svelte/qna/singleAnswer.svelte";
    function Je(n) {
      let o,
        r,
        i,
        s,
        a,
        c,
        u,
        l,
        d,
        f,
        p,
        h,
        g = n[0].content + "",
        m = (n[0].answer_by ? n[0].answer_by : "anonymous") + "",
        v = n[0].human_time_diff + "";
      const y = {
        c: function () {
          (o = b("div")),
            (r = b("div")),
            (r.textContent = " "),
            (i = x()),
            (s = b("div")),
            (a = b("p")),
            (c = w(g)),
            (u = x()),
            (l = b("p")),
            (d = w("Answered by ")),
            (f = w(m)),
            (p = x()),
            (h = w(v)),
            oe(r, "class", "col col__2"),
            t(r, ze, 5, 1, 93),
            t(a, ze, 7, 2, 159),
            oe(l, "class", "qna-answer-meta"),
            t(l, ze, 11, 2, 239),
            oe(s, "class", "col col__10"),
            t(s, ze, 6, 1, 131),
            oe(o, "class", "helpiefaq__singleqna__answer row"),
            t(o, ze, 4, 0, 45);
        },
        l: function (e) {
          throw new Error(
            "options.hydrate only works if the component was compiled with the `hydratable: true` option"
          );
        },
        m: function (e, t) {
          ee(e, o, t),
            Z(o, r),
            Z(o, i),
            Z(o, s),
            Z(s, a),
            Z(a, c),
            Z(s, u),
            Z(s, l),
            Z(l, d),
            Z(l, f),
            Z(l, p),
            Z(l, h);
        },
        p: function (e, [t]) {
          1 & t && g !== (g = e[0].content + "") && re(c, g),
            1 & t &&
              m !==
                (m = (e[0].answer_by ? e[0].answer_by : "anonymous") + "") &&
              re(f, m),
            1 & t && v !== (v = e[0].human_time_diff + "") && re(h, v);
        },
        i: e,
        o: e,
        d: function (e) {
          e && te(o);
        },
      };
      return (
        K("SvelteRegisterBlock", {
          block: y,
          id: Je.name,
          type: "component",
          source: "",
          ctx: n,
        }),
        y
      );
    }
    function Xe(e, t, n) {
      let { $$slots: o = {}, $$scope: r } = t;
      se(0, o, []);
      let { answer: i = {} } = t;
      const s = ["answer"];
      return (
        Object.keys(t).forEach((e) => {
          !~s.indexOf(e) && e.slice(0, 2);
        }),
        (e.$$set = (e) => {
          "answer" in e && n(0, (i = e.answer));
        }),
        (e.$capture_state = () => ({ answer: i })),
        (e.$inject_state = (e) => {
          "answer" in e && n(0, (i = e.answer));
        }),
        t && "$$inject" in t && e.$inject_state(t.$$inject),
        [i]
      );
    }
    const Ge = class extends ae {
        constructor(e) {
          super(e),
            G(this, e, Xe, Je, a, { answer: 0 }),
            K("SvelteRegisterComponent", {
              component: this,
              tagName: "SingleAnswer",
              options: e,
              id: Je.name,
            });
        }
        get answer() {
          throw new Error(
            "<SingleAnswer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
          );
        }
        set answer(e) {
          throw new Error(
            "<SingleAnswer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
          );
        }
      },
      { console: Ye } = f,
      Ke = "assets/js/svelte/qna/submitForm.svelte";
    function Ze(e) {
      let n, o, r, i, s, a;
      const c = {
        c: function () {
          (n = b("button")),
            (o = w("Add ")),
            (r = w(e[0])),
            oe(n, "class", (i = "submit-qna " + e[0] + " svelte-12ihpky")),
            t(n, Ke, 76, 1, 1851);
        },
        m: function (t, i) {
          ee(t, n, i),
            Z(n, o),
            Z(n, r),
            s || ((a = ne(n, "click", e[5], !1, !1, !1, !1)), (s = !0));
        },
        p: function (e, t) {
          1 & t && re(r, e[0]),
            1 & t &&
              i !== (i = "submit-qna " + e[0] + " svelte-12ihpky") &&
              oe(n, "class", i);
        },
        d: function (e) {
          e && te(n), (s = !1), a();
        },
      };
      return (
        K("SvelteRegisterBlock", {
          block: c,
          id: Ze.name,
          type: "else",
          source: "(76:0) {:else}",
          ctx: e,
        }),
        c
      );
    }
    function et(e) {
      let n, o, r, s, a, c, u, l, d, f, p;
      const h = {
        c: function () {
          (n = b("textarea")),
            (r = x()),
            (s = b("button")),
            (a = w("Submit ")),
            (c = w(e[0])),
            (l = x()),
            (d = b("button")),
            (d.textContent = "Cancel"),
            oe(n, "class", "submission__box"),
            oe(n, "placeholder", (o = "Add your " + e[0] + " here")),
            t(n, Ke, 68, 1, 1609),
            oe(s, "class", (u = "submit-qna " + e[0] + " svelte-12ihpky")),
            t(s, Ke, 73, 1, 1700),
            oe(d, "class", "cancel-qna"),
            t(d, Ke, 74, 1, 1778);
        },
        m: function (t, o) {
          ee(t, n, o),
            k(n, e[1]),
            ee(t, r, o),
            ee(t, s, o),
            Z(s, a),
            Z(s, c),
            ee(t, l, o),
            ee(t, d, o),
            f ||
              ((p = [
                ne(n, "input", e[8]),
                ne(s, "click", e[4], !1, !1, !1, !1),
                ne(d, "click", e[6], !1, !1, !1, !1),
              ]),
              (f = !0));
        },
        p: function (e, t) {
          1 & t &&
            o !== (o = "Add your " + e[0] + " here") &&
            oe(n, "placeholder", o),
            2 & t && k(n, e[1]),
            1 & t && re(c, e[0]),
            1 & t &&
              u !== (u = "submit-qna " + e[0] + " svelte-12ihpky") &&
              oe(s, "class", u);
        },
        d: function (e) {
          e && te(n),
            e && te(r),
            e && te(s),
            e && te(l),
            e && te(d),
            (f = !1),
            i(p);
        },
      };
      return (
        K("SvelteRegisterBlock", {
          block: h,
          id: et.name,
          type: "if",
          source: "(68:0) {#if showForm == true}",
          ctx: e,
        }),
        h
      );
    }
    function tt(t) {
      let n, o, r;
      function i(e, t) {
        return 1 == e[2] ? et : Ze;
      }
      let s = i(t),
        a = s(t);
      const c = {
        c: function () {
          (n = new $(!1)), (o = x()), a.c(), (r = _()), (n.a = o);
        },
        l: function (e) {
          throw new Error(
            "options.hydrate only works if the component was compiled with the `hydratable: true` option"
          );
        },
        m: function (e, i) {
          n.m(t[3], e, i), ee(e, o, i), a.m(e, i), ee(e, r, i);
        },
        p: function (e, [t]) {
          8 & t && n.p(e[3]),
            s === (s = i(e)) && a
              ? a.p(e, t)
              : (a.d(1), (a = s(e)), a && (a.c(), a.m(r.parentNode, r)));
        },
        i: e,
        o: e,
        d: function (e) {
          e && n.d(), e && te(o), a.d(e), e && te(r);
        },
      };
      return (
        K("SvelteRegisterBlock", {
          block: c,
          id: tt.name,
          type: "component",
          source: "",
          ctx: t,
        }),
        c
      );
    }
    function nt(e, t, n) {
      let o,
        r,
        { $$slots: i = {}, $$scope: s } = t;
      se(0, i, []);
      let { type: a = "question" } = t,
        { questionId: c = 0 } = t,
        u = "",
        l = "";
      function d(e) {
        let t = JSON.parse(e);
        (l = t.status),
          ("published" != t.status && "awaiting" != t.status) || n(2, (o = !1)),
          n(1, (u = "")),
          n(3, (r = "<p class='message'>" + t.message + "</p>"));
      }
      async function f() {
        let e = helpie_faq_object.url + "assets/img/moving-train.gif";
        n(3, (r = "<img class='gif' src='" + e + "' alt='Loading'/>"));
        let t = {
            action: "helpie_qna_add_post",
            nonce: thisModule.nonce,
            current_post_id: helpie_faq_object.current_post_id,
            type: a,
            question_id: c,
            value: u,
          },
          o = await we.postItem(t);
        await d(o);
      }
      function p() {
        n(2, (o = !0));
      }
      function h() {
        n(2, (o = !1));
      }
      const g = ["type", "questionId"];
      return (
        Object.keys(t).forEach((e) => {
          ~g.indexOf(e) ||
            "$$" === e.slice(0, 2) ||
            "slot" === e ||
            Ye.warn(`<SubmitForm> was created with unknown prop '${e}'`);
        }),
        (e.$$set = (e) => {
          "type" in e && n(0, (a = e.type)),
            "questionId" in e && n(7, (c = e.questionId));
        }),
        (e.$capture_state = () => ({
          StoreInstance: we,
          type: a,
          questionId: c,
          value: u,
          submissionStatus: l,
          updateForm: d,
          postItem: f,
          onAddSubmissionClick: p,
          cancelQna: h,
          showForm: o,
          submissionMessage: r,
        })),
        (e.$inject_state = (e) => {
          "type" in e && n(0, (a = e.type)),
            "questionId" in e && n(7, (c = e.questionId)),
            "value" in e && n(1, (u = e.value)),
            "submissionStatus" in e && (l = e.submissionStatus),
            "showForm" in e && n(2, (o = e.showForm)),
            "submissionMessage" in e && n(3, (r = e.submissionMessage));
        }),
        t && "$$inject" in t && e.$inject_state(t.$$inject),
        n(2, (o = !1)),
        n(3, (r = "")),
        [
          a,
          u,
          o,
          r,
          f,
          p,
          h,
          c,
          function () {
            (u = this.value), n(1, u);
          },
        ]
      );
    }
    const ot = class extends ae {
        constructor(e) {
          super(e),
            G(this, e, nt, tt, a, { type: 0, questionId: 7 }),
            K("SvelteRegisterComponent", {
              component: this,
              tagName: "SubmitForm",
              options: e,
              id: tt.name,
            });
        }
        get type() {
          throw new Error(
            "<SubmitForm>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
          );
        }
        set type(e) {
          throw new Error(
            "<SubmitForm>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
          );
        }
        get questionId() {
          throw new Error(
            "<SubmitForm>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
          );
        }
        set questionId(e) {
          throw new Error(
            "<SubmitForm>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
          );
        }
      },
      { console: rt } = f,
      it = "assets/js/svelte/qna/voteButton.svelte";
    function st(n) {
      let o, r, i, s, a, c, u;
      const l = {
        c: function () {
          (o = b("button")),
            (r = b("span")),
            (s = x()),
            (a = b("span")),
            (a.textContent = `${n[3]}`),
            oe(r, "class", (i = "icon " + ct("arrow", "down"))),
            t(r, it, 101, 4, 2321),
            oe(a, "class", "vote_count"),
            t(a, it, 102, 4, 2376),
            oe(o, "class", "single down"),
            t(o, it, 100, 3, 2254);
        },
        m: function (e, t) {
          ee(e, o, t),
            Z(o, r),
            Z(o, s),
            Z(o, a),
            c || ((u = ne(o, "click", n[11], !1, !1, !1, !1)), (c = !0));
        },
        p: e,
        d: function (e) {
          e && te(o), (c = !1), u();
        },
      };
      return (
        K("SvelteRegisterBlock", {
          block: l,
          id: st.name,
          type: "if",
          source: '(100:2) {#if options[\\"showDownVote\\"] == true}',
          ctx: n,
        }),
        l
      );
    }
    function at(n) {
      let o,
        r,
        i,
        s,
        a,
        c,
        u,
        l,
        d,
        f,
        p,
        h,
        g = 1 == n[0].showDownVote && st(n);
      const m = {
        c: function () {
          (o = b("div")),
            (r = b("div")),
            (i = b("button")),
            (s = b("span")),
            (c = x()),
            (u = b("span")),
            (l = w(n[2])),
            (f = x()),
            g && g.c(),
            oe(s, "class", (a = "icon " + ct("arrow", "up"))),
            t(s, it, 95, 3, 2104),
            oe(u, "class", "vote_count"),
            t(u, it, 96, 3, 2156),
            oe(
              i,
              "class",
              (d = "single up blue " + (n[1] ? "alreadyVoted" : ""))
            ),
            t(i, it, 91, 2, 1991),
            oe(r, "class", "helpiefaq__votebutton__group"),
            t(r, it, 90, 1, 1946),
            oe(o, "class", "helpiefaq__vote__container"),
            t(o, it, 89, 0, 1904);
        },
        l: function (e) {
          throw new Error(
            "options.hydrate only works if the component was compiled with the `hydratable: true` option"
          );
        },
        m: function (e, t) {
          ee(e, o, t),
            Z(o, r),
            Z(r, i),
            Z(i, s),
            Z(i, c),
            Z(i, u),
            Z(u, l),
            Z(r, f),
            g && g.m(r, null),
            p || ((h = ne(i, "click", n[10], !1, !1, !1, !1)), (p = !0));
        },
        p: function (e, [t]) {
          4 & t && re(l, e[2]),
            2 & t &&
              d !== (d = "single up blue " + (e[1] ? "alreadyVoted" : "")) &&
              oe(i, "class", d),
            1 == e[0].showDownVote
              ? g
                ? g.p(e, t)
                : ((g = st(e)), g.c(), g.m(r, null))
              : g && (g.d(1), (g = null));
        },
        i: e,
        o: e,
        d: function (e) {
          e && te(o), g && g.d(), (p = !1), h();
        },
      };
      return (
        K("SvelteRegisterBlock", {
          block: m,
          id: at.name,
          type: "component",
          source: "",
          ctx: n,
        }),
        m
      );
    }
    function ct(e, t) {
      return {
        arrow1: "dashicons dashicons-arrow-" + t + "-alt",
        arrow2: "dashicons dashicons-arrow-" + t + "-alt2",
        arrow: "dashicons dashicons-arrow-" + t,
        thumbs: "dashicons dashicons-thumbs-" + t,
      }[e];
    }
    function ut(e, t, n) {
      let o,
        { $$slots: r = {}, $$scope: i } = t;
      se(0, r, []);
      let { options: s } = t,
        { voteFor: a = "question" } = t,
        { questionId: c = 0 } = t,
        { answerCommentId: u = 0 } = t,
        { votes: l = { up: 0, down: 0 } } = t,
        { currentUserVotes: d = {} } = t,
        f = !1,
        p = l.down;
      function h() {
        n(1, (f = !1)), d && d.vote && n(1, (f = !0));
      }
      function g(e, t = "add") {
        var r = {
          action: "helpie_handle_vote",
          nonce: thisModule.nonce,
          vote: e,
          action_type: t,
          vote_for: a,
          question_id: c,
          answer_comment_id: u,
          current_post_id: helpie_faq_object.current_post_id,
        };
        f
          ? ((r.action_type = "remove"), n(1, (f = !1)), n(2, o--, o))
          : (n(2, o++, o), n(1, (f = !0))),
          we.postVote(r);
      }
      h(),
        e.$$.on_mount.push(function () {
          void 0 !== s ||
            "options" in t ||
            e.$$.bound[e.$$.props.options] ||
            rt.warn("<VoteButton> was created without expected prop 'options'");
        });
      const m = [
        "options",
        "voteFor",
        "questionId",
        "answerCommentId",
        "votes",
        "currentUserVotes",
      ];
      return (
        Object.keys(t).forEach((e) => {
          ~m.indexOf(e) ||
            "$$" === e.slice(0, 2) ||
            "slot" === e ||
            rt.warn(`<VoteButton> was created with unknown prop '${e}'`);
        }),
        (e.$$set = (e) => {
          "options" in e && n(0, (s = e.options)),
            "voteFor" in e && n(5, (a = e.voteFor)),
            "questionId" in e && n(6, (c = e.questionId)),
            "answerCommentId" in e && n(7, (u = e.answerCommentId)),
            "votes" in e && n(8, (l = e.votes)),
            "currentUserVotes" in e && n(9, (d = e.currentUserVotes));
        }),
        (e.$capture_state = () => ({
          StoreInstance: we,
          options: s,
          voteFor: a,
          questionId: c,
          answerCommentId: u,
          votes: l,
          currentUserVotes: d,
          alreadyVoted: f,
          downVotes: p,
          initVoteStatus: h,
          get_icon: ct,
          postVote: g,
          upVotes: o,
        })),
        (e.$inject_state = (e) => {
          "options" in e && n(0, (s = e.options)),
            "voteFor" in e && n(5, (a = e.voteFor)),
            "questionId" in e && n(6, (c = e.questionId)),
            "answerCommentId" in e && n(7, (u = e.answerCommentId)),
            "votes" in e && n(8, (l = e.votes)),
            "currentUserVotes" in e && n(9, (d = e.currentUserVotes)),
            "alreadyVoted" in e && n(1, (f = e.alreadyVoted)),
            "downVotes" in e && n(3, (p = e.downVotes)),
            "upVotes" in e && n(2, (o = e.upVotes));
        }),
        t && "$$inject" in t && e.$inject_state(t.$$inject),
        (e.$$.update = () => {
          256 & e.$$.dirty && n(2, (o = l.up));
        }),
        [s, f, o, p, g, a, c, u, l, d, () => g("up"), () => g("down")]
      );
    }
    const lt = class extends ae {
        constructor(e) {
          super(e),
            G(this, e, ut, at, a, {
              options: 0,
              voteFor: 5,
              questionId: 6,
              answerCommentId: 7,
              votes: 8,
              currentUserVotes: 9,
            }),
            K("SvelteRegisterComponent", {
              component: this,
              tagName: "VoteButton",
              options: e,
              id: at.name,
            });
        }
        get options() {
          throw new Error(
            "<VoteButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
          );
        }
        set options(e) {
          throw new Error(
            "<VoteButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
          );
        }
        get voteFor() {
          throw new Error(
            "<VoteButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
          );
        }
        set voteFor(e) {
          throw new Error(
            "<VoteButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
          );
        }
        get questionId() {
          throw new Error(
            "<VoteButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
          );
        }
        set questionId(e) {
          throw new Error(
            "<VoteButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
          );
        }
        get answerCommentId() {
          throw new Error(
            "<VoteButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
          );
        }
        set answerCommentId(e) {
          throw new Error(
            "<VoteButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
          );
        }
        get votes() {
          throw new Error(
            "<VoteButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
          );
        }
        set votes(e) {
          throw new Error(
            "<VoteButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
          );
        }
        get currentUserVotes() {
          throw new Error(
            "<VoteButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
          );
        }
        set currentUserVotes(e) {
          throw new Error(
            "<VoteButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
          );
        }
      },
      { console: dt } = f,
      ft = "assets/js/svelte/qna/singleQuestion.svelte";
    function pt(e, t, n) {
      const o = e.slice();
      return (o[7] = t[n]), (o[9] = n), o;
    }
    function ht(e) {
      let t, n;
      t = new lt({
        props: {
          voteFor: "question",
          questionId: e[0].id,
          votes: e[4],
          currentUserVotes: e[3],
          options: e[1],
        },
        $$inline: !0,
      });
      const o = {
        c: function () {
          z(t.$$.fragment);
        },
        m: function (e, o) {
          J(t, e, o), (n = !0);
        },
        p: function (e, n) {
          const o = {};
          1 & n && (o.questionId = e[0].id),
            16 & n && (o.votes = e[4]),
            8 & n && (o.currentUserVotes = e[3]),
            2 & n && (o.options = e[1]),
            t.$set(o);
        },
        i: function (e) {
          n || (V(t.$$.fragment, e), (n = !0));
        },
        o: function (e) {
          U(t.$$.fragment, e), (n = !1);
        },
        d: function (e) {
          X(t, e);
        },
      };
      return (
        K("SvelteRegisterBlock", {
          block: o,
          id: ht.name,
          type: "if",
          source: '(31:3) {#if options[\\"canVoteQuestion\\"]}',
          ctx: e,
        }),
        o
      );
    }
    function gt(e) {
      let t, n;
      t = new Ge({ props: { answer: e[7] }, $$inline: !0 });
      const o = {
        c: function () {
          z(t.$$.fragment);
        },
        m: function (e, o) {
          J(t, e, o), (n = !0);
        },
        p: function (e, n) {
          const o = {};
          1 & n && (o.answer = e[7]), t.$set(o);
        },
        i: function (e) {
          n || (V(t.$$.fragment, e), (n = !0));
        },
        o: function (e) {
          U(t.$$.fragment, e), (n = !1);
        },
        d: function (e) {
          X(t, e);
        },
      };
      return (
        K("SvelteRegisterBlock", {
          block: o,
          id: gt.name,
          type: "if",
          source: "(51:2) {#if ii == 0 || showMore == true}",
          ctx: e,
        }),
        o
      );
    }
    function mt(e) {
      let t, n;
      t = new Ue({
        props: { showMore: e[2], ii: e[9], toggleShow: e[5] },
        $$inline: !0,
      });
      const o = {
        c: function () {
          z(t.$$.fragment);
        },
        m: function (e, o) {
          J(t, e, o), (n = !0);
        },
        p: function (e, n) {
          const o = {};
          4 & n && (o.showMore = e[2]), t.$set(o);
        },
        i: function (e) {
          n || (V(t.$$.fragment, e), (n = !0));
        },
        o: function (e) {
          U(t.$$.fragment, e), (n = !1);
        },
        d: function (e) {
          X(t, e);
        },
      };
      return (
        K("SvelteRegisterBlock", {
          block: o,
          id: mt.name,
          type: "if",
          source: "(55:2) {#if question.answers.length > 1}",
          ctx: e,
        }),
        o
      );
    }
    function vt(e) {
      let t,
        n,
        o,
        r = (0 == e[9] || 1 == e[2]) && gt(e),
        i = e[0].answers.length > 1 && mt(e);
      const s = {
        c: function () {
          r && r.c(), (t = x()), i && i.c(), (n = _());
        },
        m: function (e, s) {
          r && r.m(e, s), ee(e, t, s), i && i.m(e, s), ee(e, n, s), (o = !0);
        },
        p: function (e, o) {
          0 == e[9] || 1 == e[2]
            ? r
              ? (r.p(e, o), 4 & o && V(r, 1))
              : ((r = gt(e)), r.c(), V(r, 1), r.m(t.parentNode, t))
            : r &&
              (B(),
              U(r, 1, 1, () => {
                r = null;
              }),
              W()),
            e[0].answers.length > 1
              ? i
                ? (i.p(e, o), 1 & o && V(i, 1))
                : ((i = mt(e)), i.c(), V(i, 1), i.m(n.parentNode, n))
              : i &&
                (B(),
                U(i, 1, 1, () => {
                  i = null;
                }),
                W());
        },
        i: function (e) {
          o || (V(r), V(i), (o = !0));
        },
        o: function (e) {
          U(r), U(i), (o = !1);
        },
        d: function (e) {
          r && r.d(e), e && te(t), i && i.d(e), e && te(n);
        },
      };
      return (
        K("SvelteRegisterBlock", {
          block: s,
          id: vt.name,
          type: "each",
          source: "(50:1) {#each question.answers as answer, ii}",
          ctx: e,
        }),
        s
      );
    }
    function yt(e) {
      let t, n;
      t = new ot({
        props: { type: "answer", questionId: e[0].id },
        $$inline: !0,
      });
      const o = {
        c: function () {
          z(t.$$.fragment);
        },
        m: function (e, o) {
          J(t, e, o), (n = !0);
        },
        p: function (e, n) {
          const o = {};
          1 & n && (o.questionId = e[0].id), t.$set(o);
        },
        i: function (e) {
          n || (V(t.$$.fragment, e), (n = !0));
        },
        o: function (e) {
          U(t.$$.fragment, e), (n = !1);
        },
        d: function (e) {
          X(t, e);
        },
      };
      return (
        K("SvelteRegisterBlock", {
          block: o,
          id: yt.name,
          type: "if",
          source:
            '(62:3) {#if options[\\"canAddAnswer\\"] && !question.userHasAlreadyAnswered}',
          ctx: e,
        }),
        o
      );
    }
    function bt(e) {
      let n,
        o,
        r,
        i,
        s,
        a,
        c,
        u,
        l,
        d,
        f,
        p,
        h,
        g,
        m,
        v,
        _ = e[0].content + "",
        k = e[1].canVoteQuestion && ht(e),
        S = e[0].answers;
      ie(S);
      let $ = [];
      for (let t = 0; t < S.length; t += 1) $[t] = vt(pt(e, S, t));
      const E = (e) =>
        U($[e], 1, 1, () => {
          $[e] = null;
        });
      let T = e[1].canAddAnswer && !e[0].userHasAlreadyAnswered && yt(e);
      const C = {
        c: function () {
          (n = b("div")),
            (o = b("div")),
            (r = b("div")),
            k && k.c(),
            (i = w("\n\t\t\t ")),
            (s = x()),
            (a = b("div")),
            (c = b("a")),
            (u = w(_)),
            (d = x());
          for (let e = 0; e < $.length; e += 1) $[e].c();
          (f = x()),
            (p = b("div")),
            (h = b("div")),
            (h.textContent = " "),
            (g = x()),
            (m = b("div")),
            T && T.c(),
            oe(r, "class", "col__2"),
            t(r, ft, 29, 2, 735),
            oe(c, "href", (l = e[0].url)),
            oe(c, "target", "_blank"),
            t(c, ft, 42, 3, 976),
            oe(a, "class", "col__10"),
            t(a, ft, 41, 2, 951),
            oe(o, "class", "helpiefaq__singleqna__question row"),
            t(o, ft, 27, 1, 633),
            oe(h, "class", "col col__2"),
            t(h, ft, 59, 2, 1345),
            oe(m, "class", "col col__10"),
            t(m, ft, 60, 2, 1384),
            oe(p, "class", "row"),
            t(p, ft, 58, 1, 1325),
            oe(n, "class", "helpiefaq__singleqna"),
            t(n, ft, 26, 0, 597);
        },
        l: function (e) {
          throw new Error(
            "options.hydrate only works if the component was compiled with the `hydratable: true` option"
          );
        },
        m: function (e, t) {
          ee(e, n, t),
            Z(n, o),
            Z(o, r),
            k && k.m(r, null),
            Z(r, i),
            Z(o, s),
            Z(o, a),
            Z(a, c),
            Z(c, u),
            Z(n, d);
          for (let e = 0; e < $.length; e += 1) $[e] && $[e].m(n, null);
          Z(n, f),
            Z(n, p),
            Z(p, h),
            Z(p, g),
            Z(p, m),
            T && T.m(m, null),
            (v = !0);
        },
        p: function (e, [t]) {
          if (
            (e[1].canVoteQuestion
              ? k
                ? (k.p(e, t), 2 & t && V(k, 1))
                : ((k = ht(e)), k.c(), V(k, 1), k.m(r, i))
              : k &&
                (B(),
                U(k, 1, 1, () => {
                  k = null;
                }),
                W()),
            (!v || 1 & t) && _ !== (_ = e[0].content + "") && re(u, _),
            (!v || (1 & t && l !== (l = e[0].url))) && oe(c, "href", l),
            37 & t)
          ) {
            let o;
            for (S = e[0].answers, ie(S), o = 0; o < S.length; o += 1) {
              const r = pt(e, S, o);
              $[o]
                ? ($[o].p(r, t), V($[o], 1))
                : (($[o] = vt(r)), $[o].c(), V($[o], 1), $[o].m(n, f));
            }
            for (B(), o = S.length; o < $.length; o += 1) E(o);
            W();
          }
          e[1].canAddAnswer && !e[0].userHasAlreadyAnswered
            ? T
              ? (T.p(e, t), 3 & t && V(T, 1))
              : ((T = yt(e)), T.c(), V(T, 1), T.m(m, null))
            : T &&
              (B(),
              U(T, 1, 1, () => {
                T = null;
              }),
              W());
        },
        i: function (e) {
          if (!v) {
            V(k);
            for (let e = 0; e < S.length; e += 1) V($[e]);
            V(T), (v = !0);
          }
        },
        o: function (e) {
          U(k), ($ = $.filter(Boolean));
          for (let e = 0; e < $.length; e += 1) U($[e]);
          U(T), (v = !1);
        },
        d: function (e) {
          e && te(n), k && k.d(), y($, e), T && T.d();
        },
      };
      return (
        K("SvelteRegisterBlock", {
          block: C,
          id: bt.name,
          type: "component",
          source: "",
          ctx: e,
        }),
        C
      );
    }
    function wt(e, t, n) {
      let o,
        r,
        i,
        { $$slots: s = {}, $$scope: a } = t;
      se(0, s, []);
      let { question: c } = t,
        { options: u } = t,
        l = !1;
      function d(e) {
        n(2, (i = e));
      }
      e.$$.on_mount.push(function () {
        void 0 !== c ||
          "question" in t ||
          e.$$.bound[e.$$.props.question] ||
          dt.warn(
            "<SingleQuestion> was created without expected prop 'question'"
          ),
          void 0 !== u ||
            "options" in t ||
            e.$$.bound[e.$$.props.options] ||
            dt.warn(
              "<SingleQuestion> was created without expected prop 'options'"
            );
      });
      const f = ["question", "options"];
      return (
        Object.keys(t).forEach((e) => {
          ~f.indexOf(e) ||
            "$$" === e.slice(0, 2) ||
            "slot" === e ||
            dt.warn(`<SingleQuestion> was created with unknown prop '${e}'`);
        }),
        (e.$$set = (e) => {
          "question" in e && n(0, (c = e.question)),
            "options" in e && n(1, (u = e.options));
        }),
        (e.$capture_state = () => ({
          VoteButton: lt,
          SubmitForm: ot,
          SingleAnswer: Ge,
          ShowMore: Ue,
          question: c,
          options: u,
          boxOpen: l,
          toggleShow: d,
          showMore: i,
          currentUserVotes: r,
          votes: o,
        })),
        (e.$inject_state = (e) => {
          "question" in e && n(0, (c = e.question)),
            "options" in e && n(1, (u = e.options)),
            "boxOpen" in e && (l = e.boxOpen),
            "showMore" in e && n(2, (i = e.showMore)),
            "currentUserVotes" in e && n(3, (r = e.currentUserVotes)),
            "votes" in e && n(4, (o = e.votes));
        }),
        t && "$$inject" in t && e.$inject_state(t.$$inject),
        (e.$$.update = () => {
          1 & e.$$.dirty && n(4, (o = c.votes)),
            1 & e.$$.dirty && n(3, (r = c.currentUserVotes));
        }),
        n(2, (i = !1)),
        [c, u, i, r, o, d]
      );
    }
    const xt = class extends ae {
        constructor(e) {
          super(e),
            G(this, e, wt, bt, a, { question: 0, options: 1 }),
            K("SvelteRegisterComponent", {
              component: this,
              tagName: "SingleQuestion",
              options: e,
              id: bt.name,
            });
        }
        get question() {
          throw new Error(
            "<SingleQuestion>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
          );
        }
        set question(e) {
          throw new Error(
            "<SingleQuestion>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
          );
        }
        get options() {
          throw new Error(
            "<SingleQuestion>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
          );
        }
        set options(e) {
          throw new Error(
            "<SingleQuestion>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
          );
        }
      },
      { console: _t } = f,
      kt = "assets/js/svelte/qna/qna.svelte";
    function St(e, t, n) {
      const o = e.slice();
      return (o[15] = t[n]), o;
    }
    function $t(n) {
      let o,
        r,
        i = n[18].message + "";
      const s = {
        c: function () {
          var e, n;
          (o = b("p")),
            (r = w(i)),
            (e = o),
            (n = "color"),
            null == "red"
              ? e.style.removeProperty(n)
              : e.style.setProperty(n, "red", ""),
            t(o, kt, 73, 2, 2036);
        },
        m: function (e, t) {
          ee(e, o, t), Z(o, r);
        },
        p: e,
        d: function (e) {
          e && te(o);
        },
      };
      return (
        K("SvelteRegisterBlock", {
          block: s,
          id: $t.name,
          type: "catch",
          source: "(73:1) {:catch error}",
          ctx: n,
        }),
        s
      );
    }
    function Et(t) {
      const n = { c: e, m: e, p: e, d: e };
      return (
        K("SvelteRegisterBlock", {
          block: n,
          id: Et.name,
          type: "then",
          source: '(1:0) <script context=\\"module\\">  import { onMount }',
          ctx: t,
        }),
        n
      );
    }
    function Tt(n) {
      let o, r;
      const i = {
        c: function () {
          var e, i;
          (o = b("img")),
            oe(o, "class", "gif svelte-kmb7uz"),
            (e = o.src),
            (i = r = n[5]),
            c || (c = document.createElement("a")),
            (c.href = i),
            e !== c.href && oe(o, "src", r),
            oe(o, "alt", "Loading"),
            t(o, kt, 71, 2, 1962);
        },
        m: function (e, t) {
          ee(e, o, t);
        },
        p: e,
        d: function (e) {
          e && te(o);
        },
      };
      return (
        K("SvelteRegisterBlock", {
          block: i,
          id: Tt.name,
          type: "pending",
          source:
            '(70:17)    \x3c!-- <p>...waiting</p> --\x3e   <img class=\\"gif\\" src={loadingImageUrl}',
          ctx: n,
        }),
        i
      );
    }
    function Ct(n) {
      let o;
      const r = {
        c: function () {
          (o = b("p")),
            (o.textContent = "No Questions Found"),
            oe(o, "class", "no_questions svelte-kmb7uz"),
            t(o, kt, 90, 2, 2382);
        },
        m: function (e, t) {
          ee(e, o, t);
        },
        p: e,
        i: e,
        o: e,
        d: function (e) {
          e && te(o);
        },
      };
      return (
        K("SvelteRegisterBlock", {
          block: r,
          id: Ct.name,
          type: "else",
          source: "(90:1) {:else}",
          ctx: n,
        }),
        r
      );
    }
    function jt(e) {
      let t,
        n,
        o = e[0];
      ie(o);
      let r = [];
      for (let t = 0; t < o.length; t += 1) r[t] = qt(St(e, o, t));
      const i = (e) =>
          U(r[e], 1, 1, () => {
            r[e] = null;
          }),
        s = {
          c: function () {
            for (let e = 0; e < r.length; e += 1) r[e].c();
            t = _();
          },
          m: function (e, o) {
            for (let t = 0; t < r.length; t += 1) r[t] && r[t].m(e, o);
            ee(e, t, o), (n = !0);
          },
          p: function (e, n) {
            if (13 & n) {
              let s;
              for (o = e[0], ie(o), s = 0; s < o.length; s += 1) {
                const i = St(e, o, s);
                r[s]
                  ? (r[s].p(i, n), V(r[s], 1))
                  : ((r[s] = qt(i)),
                    r[s].c(),
                    V(r[s], 1),
                    r[s].m(t.parentNode, t));
              }
              for (B(), s = o.length; s < r.length; s += 1) i(s);
              W();
            }
          },
          i: function (e) {
            if (!n) {
              for (let e = 0; e < o.length; e += 1) V(r[e]);
              n = !0;
            }
          },
          o: function (e) {
            r = r.filter(Boolean);
            for (let e = 0; e < r.length; e += 1) U(r[e]);
            n = !1;
          },
          d: function (e) {
            y(r, e), e && te(t);
          },
        };
      return (
        K("SvelteRegisterBlock", {
          block: s,
          id: jt.name,
          type: "if",
          source: "(86:1) {#if 0 < questions.length}",
          ctx: e,
        }),
        s
      );
    }
    function qt(e) {
      let t, n;
      t = new xt({
        props: { options: e[3], question: e[15], qnaStore: e[2] },
        $$inline: !0,
      });
      const o = {
        c: function () {
          z(t.$$.fragment);
        },
        m: function (e, o) {
          J(t, e, o), (n = !0);
        },
        p: function (e, n) {
          const o = {};
          1 & n && (o.question = e[15]), t.$set(o);
        },
        i: function (e) {
          n || (V(t.$$.fragment, e), (n = !0));
        },
        o: function (e) {
          U(t.$$.fragment, e), (n = !1);
        },
        d: function (e) {
          X(t, e);
        },
      };
      return (
        K("SvelteRegisterBlock", {
          block: o,
          id: qt.name,
          type: "each",
          source: "(87:2) {#each questions as question}",
          ctx: e,
        }),
        o
      );
    }
    function At(e) {
      let t, n;
      t = new ot({ props: { type: "question" }, $$inline: !0 });
      const o = {
        c: function () {
          z(t.$$.fragment);
        },
        m: function (e, o) {
          J(t, e, o), (n = !0);
        },
        i: function (e) {
          n || (V(t.$$.fragment, e), (n = !0));
        },
        o: function (e) {
          U(t.$$.fragment, e), (n = !1);
        },
        d: function (e) {
          X(t, e);
        },
      };
      return (
        K("SvelteRegisterBlock", {
          block: o,
          id: At.name,
          type: "if",
          source: '(96:3) {#if options[\\"canAddQuestion\\"]}',
          ctx: e,
        }),
        o
      );
    }
    function Pt(e) {
      let n,
        o,
        r,
        s,
        a,
        c,
        u,
        l,
        d,
        f,
        p,
        h,
        g,
        m,
        v,
        y,
        w,
        _,
        S,
        $ = {
          ctx: e,
          current: null,
          token: null,
          hasCatch: !0,
          pending: Tt,
          then: Et,
          catch: $t,
          error: 18,
        };
      !(function (e, t) {
        const n = (t.token = {});
        function o(e, o, r, i) {
          if (t.token !== n) return;
          t.resolved = i;
          let s = t.ctx;
          void 0 !== r && ((s = s.slice()), (s[r] = i));
          const a = e && (t.current = e)(s);
          let c = !1;
          t.block &&
            (t.blocks
              ? t.blocks.forEach((e, n) => {
                  n !== o &&
                    e &&
                    (B(),
                    U(e, 1, 1, () => {
                      t.blocks[n] === e && (t.blocks[n] = null);
                    }),
                    W());
                })
              : t.block.d(1),
            a.c(),
            V(a, 1),
            a.m(t.mount(), t.anchor),
            (c = !0)),
            (t.block = a),
            t.blocks && (t.blocks[o] = a),
            c && R();
        }
        if (
          !(r = e) ||
          ("object" != typeof r && "function" != typeof r) ||
          "function" != typeof r.then
        ) {
          if (t.current !== t.then) return o(t.then, 1, t.value, e), !0;
          t.resolved = e;
        } else {
          const n = T();
          if (
            (e.then(
              (e) => {
                E(n), o(t.then, 1, t.value, e), E(null);
              },
              (e) => {
                if ((E(n), o(t.catch, 2, t.error, e), E(null), !t.hasCatch))
                  throw e;
              }
            ),
            t.current !== t.pending)
          )
            return o(t.pending, 0), !0;
        }
        var r;
      })((s = e[4]), $);
      const C = [jt, Ct],
        j = [];
      function q(e, t) {
        return 0 < e[0].length ? 0 : 1;
      }
      (l = q(e)), (d = j[l] = C[l](e));
      let A = e[3].canAddQuestion && At(e);
      y = new Fe({
        props: { options: e[3], store: e[2], searchText: e[1] },
        $$inline: !0,
      });
      const P = {
        c: function () {
          (n = b("div")),
            (o = b("div")),
            (r = x()),
            $.block.c(),
            (a = x()),
            (c = b("input")),
            (u = x()),
            d.c(),
            (f = x()),
            (p = b("div")),
            (h = b("div")),
            (h.textContent = " "),
            (g = x()),
            (m = b("div")),
            A && A.c(),
            (v = x()),
            z(y.$$.fragment),
            t(o, kt, 68, 1, 1905),
            oe(c, "class", "search"),
            oe(c, "type", "text"),
            oe(c, "placeholder", "Search.."),
            t(c, kt, 76, 1, 2090),
            oe(h, "class", "col col__2"),
            t(h, kt, 93, 2, 2457),
            oe(m, "class", "col col__10"),
            t(m, kt, 94, 2, 2496),
            oe(p, "class", "row"),
            t(p, kt, 92, 1, 2437),
            oe(n, "class", "helpiefaq__qna__section"),
            t(n, kt, 67, 0, 1866);
        },
        l: function (e) {
          throw new Error(
            "options.hydrate only works if the component was compiled with the `hydratable: true` option"
          );
        },
        m: function (t, i) {
          ee(t, n, i),
            Z(n, o),
            Z(n, r),
            $.block.m(n, ($.anchor = null)),
            ($.mount = () => n),
            ($.anchor = a),
            Z(n, a),
            Z(n, c),
            k(c, e[1]),
            Z(n, u),
            j[l].m(n, null),
            Z(n, f),
            Z(n, p),
            Z(p, h),
            Z(p, g),
            Z(p, m),
            A && A.m(m, null),
            Z(n, v),
            J(y, n, null),
            (w = !0),
            _ ||
              ((S = [
                ne(c, "input", e[6]),
                ne(c, "input", e[7], !1, !1, !1, !1),
              ]),
              (_ = !0));
        },
        p: function (t, [o]) {
          (function (e, t, n) {
            const o = t.slice(),
              { resolved: r } = e;
            e.current === e.then && (o[e.value] = r),
              e.current === e.catch && (o[e.error] = r),
              e.block.p(o, n);
          })($, (e = t), o),
            2 & o && c.value !== e[1] && k(c, e[1]);
          let r = l;
          (l = q(e)),
            l === r
              ? j[l].p(e, o)
              : (B(),
                U(j[r], 1, 1, () => {
                  j[r] = null;
                }),
                W(),
                (d = j[l]),
                d ? d.p(e, o) : ((d = j[l] = C[l](e)), d.c()),
                V(d, 1),
                d.m(n, f));
          const i = {};
          2 & o && (i.searchText = e[1]), y.$set(i);
        },
        i: function (e) {
          w || (V(d), V(A), V(y.$$.fragment, e), (w = !0));
        },
        o: function (e) {
          U(d), U(A), U(y.$$.fragment, e), (w = !1);
        },
        d: function (e) {
          e && te(n),
            $.block.d(),
            ($.token = null),
            ($ = null),
            j[l].d(),
            A && A.d(),
            X(y),
            (_ = !1),
            i(S);
        },
      };
      return (
        K("SvelteRegisterBlock", {
          block: P,
          id: Pt.name,
          type: "component",
          source: "",
          ctx: e,
        }),
        P
      );
    }
    function It(e, t, n) {
      let o,
        r,
        { $$slots: i = {}, $$scope: s } = t;
      se(0, i, []);
      let a = helpie_faq_object.qna_capabilities,
        c = we,
        u = [],
        l = {
          showUpVote: !0,
          showDownVote: !1,
          canVoteQuestion: a.can_vote_question,
          canAddAnswer: a.can_add_answer,
          canAddQuestion: a.can_add_question,
        },
        f = {
          action: "helpie_qna_get_posts",
          nonce: thisModule.nonce,
          current_post_id: helpie_faq_object.current_post_id,
        },
        p = h(f);
      async function h(e) {
        await c.getPosts(e);
      }
      const g = c.viewableQuestions.subscribe((e) => {
          n(0, (u = [])), n(0, (u = JSON.parse(JSON.stringify(e))));
        }),
        m = c.searchText.subscribe((e) => {
          n(1, (o = e));
        }),
        v = c.currentPage.subscribe((e) => {
          r = e;
        });
      let y = helpie_faq_object.url + "assets/img/moving-train.gif";
      const b = [];
      return (
        Object.keys(t).forEach((e) => {
          ~b.indexOf(e) ||
            "$$" === e.slice(0, 2) ||
            "slot" === e ||
            _t.warn(`<Qna> was created with unknown prop '${e}'`);
        }),
        (e.$capture_state = () => ({
          onMount: C,
          SubmitForm: ot,
          SingleQuestion: xt,
          Pagination: Fe,
          StoreInstances: we,
          get: d,
          qnaCapabilities: a,
          qnaStore: c,
          questions: u,
          options: l,
          postargs: f,
          promise: p,
          getPosts: h,
          unsubscribe1: g,
          unsubscribe2: m,
          unsubscribe3: v,
          loadingImageUrl: y,
          currentPage: r,
          searchText: o,
        })),
        (e.$inject_state = (e) => {
          "qnaCapabilities" in e && (a = e.qnaCapabilities),
            "qnaStore" in e && n(2, (c = e.qnaStore)),
            "questions" in e && n(0, (u = e.questions)),
            "options" in e && n(3, (l = e.options)),
            "postargs" in e && (f = e.postargs),
            "promise" in e && n(4, (p = e.promise)),
            "loadingImageUrl" in e && n(5, (y = e.loadingImageUrl)),
            "currentPage" in e && (r = e.currentPage),
            "searchText" in e && n(1, (o = e.searchText));
        }),
        t && "$$inject" in t && e.$inject_state(t.$$inject),
        n(1, (o = "")),
        (r = 1),
        [
          u,
          o,
          c,
          l,
          p,
          y,
          function () {
            (o = this.value), n(1, o);
          },
          () => {
            c.setSearchText(o);
          },
        ]
      );
    }
    const Nt = class extends ae {
      constructor(e) {
        super(e),
          G(this, e, It, Pt, a, {}),
          K("SvelteRegisterComponent", {
            component: this,
            tagName: "Qna",
            options: e,
            id: Pt.name,
          });
      }
    };
    var Ot = n(992),
      Lt = n(607),
      Mt = n(669),
      Rt = n(29),
      Dt = n(753),
      Ht = {
        nonce: helpie_faq_object.nonce,
        init: function () {
          this.setShortcodeIndex(),
            this.onPageLoadActions(),
            this.eventHandlers(),
            Lt.init(this.nonce),
            Ot.init(),
            Mt.init(),
            Rt.init(),
            this.initQnaApp();
        },
        initQnaApp: function () {
          var e = document.getElementById("helpie-qna-app");
          e && new Nt({ target: e, props: {} });
        },
        setShortcodeIndex: function () {
          var e = 0;
          jQuery(".helpie-faq").each(function () {
            jQuery(this).attr("data-shortcode-index", e), e++;
          });
        },
        eventHandlers: function () {
          var e = this;
          jQuery(".helpie-faq").on("click", ".accordion__header", function (t) {
            if (
              (t.preventDefault(),
              t.stopPropagation(),
              e.isFaqList(jQuery(this)))
            )
              return !1;
            e.onHeaderClick(this);
            var n = jQuery(this).attr("data-item");
            void 0 !== n &&
              "undefined" !== n &&
              "" !== n &&
              (window.location.hash = jQuery(this).attr("data-item"));
          }),
            jQuery(".helpie-faq").on(
              "click",
              ".accordion__title, .faq-title-icon",
              function (t) {
                var n = jQuery(this).closest(".accordion__header");
                if (
                  (t.preventDefault(),
                  t.stopPropagation(),
                  e.isFaqList(jQuery(this)))
                )
                  return !1;
                e.onHeaderClick(n);
                var o = n.attr("data-item");
                void 0 !== o &&
                  "undefined" !== o &&
                  "" !== o &&
                  (window.location.hash = n.attr("data-item"));
              }
            );
        },
        openFirstAccordion: function () {
          jQuery(".helpie-faq.accordions.open-first > .accordion:first").each(
            function () {
              var e = ".accordion__item:first > .accordion__header";
              jQuery(this).find(e).addClass("active"),
                jQuery(this)
                  .find(e)
                  .next(".accordion__body")
                  .stop()
                  .slideDown(300);
            }
          );
        },
        onPageLoadActions: function () {
          var e = window.location.hash,
            t = !1;
          "" != e && (Dt.doSearch(e), (t = this.openHFaqAccordion(e))),
            t || this.openFirstAccordion();
        },
        onHeaderClick: function (e) {
          jQuery(e).hasClass("active")
            ? this.closeAccordion(e)
            : (jQuery(e)
                .closest(".helpie-faq.accordions")
                .hasClass("faq-toggle") &&
                (jQuery(e)
                  .closest(".accordion")
                  .find(".accordion__header")
                  .removeClass("active"),
                jQuery(e)
                  .closest(".accordion")
                  .find(".accordion__body")
                  .slideUp()),
              this.openAccordion(e));
        },
        openAccordion: function (e) {
          jQuery(e).addClass("active"),
            jQuery(e).next(".accordion__body").stop().slideDown(300);
          var t = jQuery(e).attr("data-id");
          t && Lt.clickCounter(t);
        },
        closeAccordion: function (e) {
          jQuery(e).removeClass("active"),
            jQuery(e).next(".accordion__body").stop().slideUp(300);
        },
        openHFaqAccordion: function (e) {
          var t = !1;
          return (
            jQuery(".helpie-faq.accordions .accordion .accordion__item").each(
              function () {
                if (
                  "#" +
                    jQuery(this)
                      .find(".accordion__header")
                      .attr("data-item") ===
                  e
                ) {
                  if (
                    (jQuery(this).find(".accordion__header").addClass("active"),
                    jQuery(this)
                      .find(".accordion__header")
                      .next(".accordion__body")
                      .stop()
                      .slideDown(300),
                    jQuery(this).parents(".accordion").length > 0)
                  ) {
                    var n = jQuery(this).closest(".accordion").parent();
                    n.prev().addClass("active"), n.show();
                  }
                  var o = jQuery(this).find(".accordion__header").offset().top;
                  return (
                    (o -= parseInt(70)),
                    window.scrollTo({ top: o, behavior: "smooth" }),
                    (t = !0),
                    !1
                  );
                }
              }
            ),
            t
          );
        },
        isFaqList: function (e) {
          return jQuery(e).closest("article.faq_list").length;
        },
      };
    jQuery(document).ready(function () {
      Ht.init();
    });
  })();
})();
